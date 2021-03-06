export const ServiceAddonsList = [
  {
    servicePlugin: {
      serviceUid: 'addonDummyPlugin',
      manufacturer: 'Vodafone',
      flows: [
        {
          action: 'DEACTIVATE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'plugin.addon.deactivate',
              description: 'dummy addon deactivation',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'delete addon when deactivation succeeded',
              conditionOn: {
                'plugin.addon.deactivate.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when deactivation failed',
              conditionOn: {
                'plugin.addon.deactivate.success': 'NOT(true)',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
                'subscriptionInfo.erCancelTimestamp': '${nowIso8601}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['DEACTIVATION_FAILED'],
        },
        {
          action: 'ACTIVATE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'plugin.addon.activate',
              description: 'dummy addon activation',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when activation completed',
              conditionOn: {
                'plugin.addon.activate.success': 'true',
                'addon.activation.result': 'success_active',
              },
              payload: {
                status: 'ACTIVE',
                'userInfo.informationChunks': '${payload.userInfo.informationChunks}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when activation not completed',
              conditionOn: {
                'plugin.addon.activate.success': 'true',
                'addon.activation.result': 'success_pending_completion',
              },
              payload: {
                status: 'PURCHASED_PENDING_COMPLETION',
                'userInfo.informationChunks': '${payload.userInfo.informationChunks}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when missing user info',
              conditionOn: {
                'plugin.addon.activate.success': 'true',
                'addon.activation.result': 'success_pending_userinfo',
              },
              payload: {
                status: 'PURCHASED_PENDING_USERINFO',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when activation failed',
              conditionOn: {
                'plugin.addon.activate.success': 'false',
              },
              payload: {
                status: 'ACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'PURCHASED_PENDING_COMPLETION', 'ACTIVATION_FAILED'],
        },
        {
          action: 'SUSPEND',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'plugin.addon.suspend',
              description: 'dummy addon suspend',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when suspend completed',
              conditionOn: {
                'plugin.addon.suspend.success': 'true',
              },
              payload: {
                status: '${payload.initialAddonStatus}',
                'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
                'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['PURCHASED_PENDING_COMPLETION', 'PURCHASED_PENDING_USERINFO', 'ACTIVE'],
        },
        {
          action: 'UPDATE_USERINFO',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'plugin.addon.update_userinfo',
              description: 'dummy addon update user info',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when update user info succeeded',
              conditionOn: {
                'plugin.addon.update_userinfo.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
                'userInfo.informationChunks': '${payload.userInfo.informationChunks}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when update user info failed',
              conditionOn: {
                'plugin.addon.update_userinfo.success': 'false',
              },
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
        {
          action: 'CANCEL',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as DEACTIVATE',
              payload: {
                erSubscriptionStatus: 'DEACTIVATE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update userCancelTimestamp when cancellation completed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                'subscriptionInfo.userCancelTimestamp': '${nowIso8601}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.cancel',
              description: 'dummy addon cancellation',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancellation completed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                'customInfo.success': 'false',
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['CANCELLED', 'CANCELLATION_FAILED'],
        },
        {
          action: 'RENEW',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'plugin.addon.renew',
              description: 'dummy addon renew',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when renew completed',
              conditionOn: {
                'plugin.addon.renew.success': 'true',
              },
              payload: {
                status: '${payload.initialAddonStatus}',
                'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
                'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'PURCHASED_PENDING_USERINFO', 'PURCHASED_PENDING_COMPLETION'],
        },
        {
          action: 'COMPLETE_ACTIVATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'addonLoadService',
              description: 'Set addonServiceInfo inside executionContext ',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'PURCHASED_PENDING_COMPLETION', 'ACTIVATION_FAILED'],
        },
        {
          action: 'REVOKE_CANCELLATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as ACTIVATE',
              payload: {
                erSubscriptionStatus: 'ACTIVATE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update subscriptionInfo',
              payload: {
                'subscriptionInfo.userCancelTimestamp': '',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation completed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'CANCELLED'],
        },
        {
          action: 'FORCE_DEACTIVATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'template.cancel.remove.subscription.id',
              description: 'Call ER charging cancel subscription service for immediate termination of subscription',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.deactivate',
              description: 'dummy addon force deactivation',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'delete addon when cancel subscription and deactivation succeeded',
              conditionOn: {
                'payments.cancelSubscription.success': 'true',
                'plugin.addon.deactivate.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancel subscription failed',
              conditionOn: {
                'payments.cancelSubscription.success': 'false',
                'plugin.addon.deactivate.success': 'true',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when deactivation failed',
              conditionOn: {
                'payments.cancelSubscription.success': 'true',
                'plugin.addon.deactivate.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when both failed',
              conditionOn: {
                'payments.cancelSubscription.success': 'false',
                'plugin.addon.deactivate.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['DEACTIVATION_FAILED'],
        },
        {
          action: 'PURCHASE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'template.purchaseAddon',
              description: 'Purchase addon',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'delete addon when payment failed',
              conditionOn: {
                'purchase.success': 'NOT(true)',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.activate',
              description: 'dummy addon activation',
              conditionOn: {
                'purchase.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when missing userinfo',
              conditionOn: {
                'plugin.addon.activate.success': 'true',
                'addon.activation.result': 'success_pending_userinfo',
              },
              payload: {
                status: 'PURCHASED_PENDING_USERINFO',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when activation not completed',
              conditionOn: {
                'plugin.addon.activate.success': 'true',
                'addon.activation.result': 'success_pending_completion',
              },
              payload: {
                status: 'PURCHASED_PENDING_COMPLETION',
                'userInfo.informationChunks': '${payload.userInfo.informationChunks}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when activation completed',
              conditionOn: {
                'plugin.addon.activate.success': 'true',
                'addon.activation.result': 'success_active',
              },
              payload: {
                'customInfo.success': 'true',
                status: 'ACTIVE',
                'userInfo.informationChunks': '${payload.userInfo.informationChunks}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonLoadService',
              description: 'Populate executionContext with addonServices',
              conditionOn: {
                'plugin.addon.activate.success': 'true',
                'addon.activation.result': 'success_active',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when activation failed',
              conditionOn: {
                'plugin.addon.activate.success': 'false',
              },
              payload: {
                status: 'ACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['PURCHASED_PENDING_USERINFO', 'PURCHASED_PENDING_COMPLETION', 'ACTIVE'],
        },
      ],
      states: [
        {
          stateName: 'PURCHASING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'PURCHASED_PENDING_USERINFO', 'PURCHASED_PENDING_COMPLETION', 'ACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'RENEWING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'PURCHASED_PENDING_USERINFO', 'PURCHASED_PENDING_COMPLETION'],
          allowDeletion: false,
        },
        {
          stateName: 'PURCHASED_PENDING_USERINFO',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'PURCHASED_PENDING_COMPLETION', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'PURCHASED_PENDING_COMPLETION',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'COMPLETE_ACTIVATION',
              targetInterimState: 'COMPLETING_ACTIVATION',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'SUSPENDING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['PURCHASED_PENDING_COMPLETION', 'PURCHASED_PENDING_USERINFO', 'ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'COMPLETING_ACTIVATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVE',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'UPDATE_USERINFO',
              targetInterimState: 'UPDATING_USERINFO',
            },
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: true,
        },
        {
          stateName: 'UPDATING_USERINFO',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['CANCELLED', 'CANCELLATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLED',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'REVOKE_CANCELLATION',
              targetInterimState: 'REVOKING_CANCELLATION',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'DEACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['DEACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'DEACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'REVOKING_CANCELLATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: [],
          allowDeletion: false,
        },
      ],
      requiredUserInfo: {
        sections: [
          {
            informationChunks: [
              {
                key: 'Name',
                type: 'text',
                localValidation: {
                  maxLength: '128',
                  pattern: 'XlthLXpBLVpdKyQ=',
                },
                optional: false,
              },
              {
                key: 'Surname1',
                type: 'text',
                localValidation: {
                  maxLength: '128',
                  pattern: 'XlthLXpBLVpdKyQ=',
                },
                optional: false,
              },
              {
                key: 'Surname2',
                type: 'text',
                localValidation: {
                  maxLength: '128',
                  pattern: 'XlthLXpBLVpdKyQ=',
                },
                optional: false,
              },
              {
                key: 'NationalId',
                type: 'text',
                localValidation: {
                  maxLength: '10',
                  pattern: 'XlthLXpBLVowLTlfXSsk',
                },
                optional: false,
              },
              {
                key: 'Address',
                type: 'address',
                optional: false,
              },
              {
                key: 'Email',
                type: 'text',
                localValidation: {
                  maxLength: '100',
                  pattern:
                    'KD86W2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqfCIoPzpbXHgwMS1ceDA4XHgwYlx4MGNceDBlLVx4MWZceDIxXHgyMy1ceDViXHg1ZC1ceDdmXXxcXFtceDAxLVx4MDlceDBiXHgwY1x4MGUtXHg3Zl0pKiIpQCg/Oig/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP3xcWyg/Oig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT98W2EtejAtOS1dKlthLXowLTldOig/OltceDAxLVx4MDhceDBiXHgwY1x4MGUtXHgxZlx4MjEtXHg1YVx4NTMtXHg3Zl18XFxbXHgwMS1ceDA5XHgwYlx4MGNceDBlLVx4N2ZdKSspXF0p',
                },
                optional: false,
              },
              {
                key: 'Msisdn',
                type: 'text',
                localValidation: {
                  maxLength: '16',
                  numberTypes: ['MOBILE'],
                  pattern:
                    'XCsoOVs5NzZdXGR8OFs5ODc1MzBdXGR8Nls5ODddXGR8NVs5MF1cZHw0MlxkfDNbODc1XVxkfDJbOTg2NTQzMjFdXGR8OVs4NTQzMjEwXXw4WzY0MjFdfDZbNjU0MzIxMF18NVs4NzY1NDMyMV18NFs5ODc2NTQzMTBdfDNbOTY0MzIxMF18Mls3MF18N3wxKVxkezEsMTR9JA==',
                },
                optional: false,
              },
            ],
          },
        ],
        version: '1.6.0',
      },
      conditions: [
        {
          key: 'jsonpath:device:status',
          value: 'ACTIVE',
          failureMessage: 'Device needs to be active to purchase this service addon.',
        },
      ],
      url: 'http://addon-plugin-stub-yoda.smartlife.vodafo.ne',
    },
    serviceDefinition: {
      serviceUid: 'addonDummyPlugin',
      image: {
        id: '614c4c62c358337523a7b082',
        size: 4.086,
        mimeType: 'image/png',
        md5Hash: '58a5848b51a7a80b3e83ba80e1071aea',
        uploadDate: 1632390242154,
        height: 256,
        width: 256,
      },
      requiredFeatureSupport: ['abc', '123', 'aa', '456'],
      countries: [
        {
          country: 'DE',
          name: '              ',
          description: 'tanjare',
          addonCard: {
            headline: 'AddonPlugin',
            buttons: [
              {
                caption: 'clickToCall',
                type: 'editUserInfo',
                phoneNumber: '+34123456678',
                url: 'https://content.smarltife.vodafo.n',
              },
              {
                caption: 'EnterUserInfo',
                type: 'editUserInfo',
                phoneNumber: '4915202502435',
                content: 'a',
              },
              {
                caption: 'click2View',
                type: 'editUserInfo',
                phoneNumber: '3',
                content: 'https://content.smartlife.vodafo.ne/service-addons/addonDummyPlugin',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'Name',
                    name: 'Dummy',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'Surname1',
                    name: 'test',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'Surname2',
                    name: 'Doherty',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'NationalId',
                    name: 'IE23959222',
                    type: 'text',
                    localValidation: {
                      maxLength: '10',
                      pattern: 'XlthLXpBLVowLTlfXSsk',
                    },
                    optional: false,
                  },
                  {
                    key: 'Address',
                    name: 'address',
                    type: 'address',
                    optional: false,
                  },
                  {
                    key: 'Email',
                    name: 'matt@odoherty.com',
                    type: 'text',
                    localValidation: {
                      maxLength: '100',
                      pattern:
                        'KD86W2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqfCIoPzpbXHgwMS1ceDA4XHgwYlx4MGNceDBlLVx4MWZceDIxXHgyMy1ceDViXHg1ZC1ceDdmXXxcXFtceDAxLVx4MDlceDBiXHgwY1x4MGUtXHg3Zl0pKiIpQCg/Oig/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP3xcWyg/Oig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT98W2EtejAtOS1dKlthLXowLTldOig/OltceDAxLVx4MDhceDBiXHgwY1x4MGUtXHgxZlx4MjEtXHg1YVx4NTMtXHg3Zl18XFxbXHgwMS1ceDA5XHgwYlx4MGNceDBlLVx4N2ZdKSspXF0p',
                    },
                    optional: false,
                  },
                  {
                    key: 'Msisdn',
                    name: '1344442223333',
                    type: 'text',
                    localValidation: {
                      maxLength: '16',
                      numberTypes: ['MOBILE'],
                      pattern:
                        'XCsoOVs5NzZdXGR8OFs5ODc1MzBdXGR8Nls5ODddXGR8NVs5MF1cZHw0MlxkfDNbODc1XVxkfDJbOTg2NTQzMjFdXGR8OVs4NTQzMjEwXXw4WzY0MjFdfDZbNjU0MzIxMF18NVs4NzY1NDMyMV18NFs5ODc2NTQzMTBdfDNbOTY0MzIxMF18Mls3MF18N3wxKVxkezEsMTR9JA==',
                    },
                    optional: false,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'https://cone.com',
          conditions: [
            {
              key: 'jsonpath:device:status',
              value: 'ACTIVE',
              failureMessage: 'Device needs to be active to purchase this service addon.',
            },
            {
              key: 'jsonpath:device:subscriptionInfo.simActive',
              value: 'true',
              failureMessage: 'The V SIM needs to be inserted into the device and the device needs to be switched on.',
            },
          ],
        },
        {
          country: 'ES',
          name: 'asdasd',
          description: 'asdasd',
          addonCard: {
            headline: 'asdasd',
            buttons: [
              {
                caption: 'asdasd',
                type: 'click2call',
                phoneNumber: '+351 123456789',
                url: '',
              },
              {
                caption: 'asdasd',
                type: 'click2webview',
                phoneNumber: '',
                url: 'asdasdasd',
              },
              {
                caption: 'asdasd',
                type: 'click2view',
                phoneNumber: '',
                url: '',
                content: 'asdasd',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'Name',
                    name: 'asdasd',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'Surname1',
                    name: 'asdasd',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'Surname2',
                    name: 'asdasd',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'NationalId',
                    name: 'asdasd',
                    type: 'text',
                    localValidation: {
                      maxLength: '10',
                      pattern: 'XlthLXpBLVowLTlfXSsk',
                    },
                    optional: false,
                  },
                  {
                    key: 'Address',
                    name: 'asdasd',
                    type: 'address',
                    optional: false,
                  },
                  {
                    key: 'Email',
                    name: 'asdasd',
                    type: 'text',
                    localValidation: {
                      maxLength: '100',
                      pattern:
                        'KD86W2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqfCIoPzpbXHgwMS1ceDA4XHgwYlx4MGNceDBlLVx4MWZceDIxXHgyMy1ceDViXHg1ZC1ceDdmXXxcXFtceDAxLVx4MDlceDBiXHgwY1x4MGUtXHg3Zl0pKiIpQCg/Oig/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP3xcWyg/Oig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT98W2EtejAtOS1dKlthLXowLTldOig/OltceDAxLVx4MDhceDBiXHgwY1x4MGUtXHgxZlx4MjEtXHg1YVx4NTMtXHg3Zl18XFxbXHgwMS1ceDA5XHgwYlx4MGNceDBlLVx4N2ZdKSspXF0p',
                    },
                    optional: false,
                  },
                  {
                    key: 'Msisdn',
                    name: 'asdasd',
                    type: 'text',
                    localValidation: {
                      maxLength: '16',
                      numberTypes: ['MOBILE'],
                      pattern:
                        'XCsoOVs5NzZdXGR8OFs5ODc1MzBdXGR8Nls5ODddXGR8NVs5MF1cZHw0MlxkfDNbODc1XVxkfDJbOTg2NTQzMjFdXGR8OVs4NTQzMjEwXXw4WzY0MjFdfDZbNjU0MzIxMF18NVs4NzY1NDMyMV18NFs5ODc2NTQzMTBdfDNbOTY0MzIxMF18Mls3MF18N3wxKVxkezEsMTR9JA==',
                    },
                    optional: false,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'https://content-yoda.smartlife.vodafo.ne/service-addons/addonDummyPlugin',
          conditions: [
            {
              key: 'jsonpath:device:status',
              value: 'ACTIVE',
              failureMessage: 'Device needs to be active to purchase this service addon.',
            },
          ],
        },
      ],
    },
  },
  {
    servicePlugin: {
      serviceUid: 'vaa',
      manufacturer: 'Vodafone',
      flows: [
        {
          action: 'DEACTIVATE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'deviceLoad',
              description: 'Load the device from DB',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.vaa.delete.service',
              description: 'Deleting vaa service addon at Samsung',
              payload: {
                status: 'DEACTIVATE',
                pricePlanId: '${payload.pricingText1}',
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'Updating status of the vaa addon service to delete',
              conditionOn: {
                'plugin.addon.vaa.delete.service.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the status of vaa addon to DEACTIVATION_FAILED',
              conditionOn: {
                'plugin.addon.vaa.delete.service.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [
            'ACTIVE',
            'ACTIVATION_FAILED',
            'CANCELLED',
            'CANCELLATION_FAILED',
            'DEACTIVATION_FAILED',
          ],
        },
        {
          action: 'SUSPEND',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'addonUpdate',
              description: 'update status when suspend completed',
              payload: {
                status: '${payload.initialAddonStatus}',
                'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
                'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
        {
          action: 'CANCEL',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as DEACTIVATE',
              payload: {
                erSubscriptionStatus: 'DEACTIVATE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancellation completed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'CANCELLATION_FAILED'],
        },
        {
          action: 'RENEW',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'addonUpdate',
              description: 'update status when suspend completed',
              payload: {
                status: '${payload.initialAddonStatus}',
                'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
                'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
        {
          action: 'REVOKE_CANCELLATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as ACTIVATE',
              payload: {
                erSubscriptionStatus: 'ACTIVATE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation completed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['CANCELLED'],
        },
        {
          action: 'FORCE_DEACTIVATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.cancelSubscription',
              description: 'Call ER charging cancel subscription service for immediate termination of subscription',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon status to DEACTIVATION_FAILED',
              conditionOn: {
                'payments.cancelSubscription.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.vaa.delete.service',
              description: 'Deleting vaa service addon at Samsung',
              conditionOn: {
                'payments.cancelSubscription.success': 'true',
              },
              payload: {
                status: 'DEACTIVATE',
                pricePlanId: '${payload.pricingText1}',
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'Updating status of the vaa addon service to delete',
              conditionOn: {
                'plugin.addon.vaa.delete.service.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the status of vaa addon to DEACTIVATION_FAILED.',
              conditionOn: {
                'plugin.addon.vaa.delete.service.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [
            'CANCELLATION_FAILED',
            'DEACTIVATION_FAILED',
            'ACTIVATION_FAILED',
            'ACTIVE',
            'CANCELLED',
          ],
        },
        {
          action: 'PURCHASE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'template.purchaseAddon',
              description: 'Purchase addon',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'delete addon when payment failed',
              conditionOn: {
                'purchase.success': 'NOT(true)',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.vaa.update.service',
              description: 'Update VAA service addon plan at samsung.',
              conditionOn: {
                'purchase.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
                pricePlanId: '${payload.pricingText1}',
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon service status to ACTIVE',
              conditionOn: {
                'purchase.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
      ],
      states: [
        {
          stateName: 'PURCHASING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'RENEWING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'SUSPENDING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'COMPLETING_ACTIVATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVE',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: true,
        },
        {
          stateName: 'CANCELLING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['CANCELLED', 'CANCELLATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLED',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'REVOKE_CANCELLATION',
              targetInterimState: 'REVOKING_CANCELLATION',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'DEACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['DEACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'DEACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'REVOKING_CANCELLATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: [],
          allowDeletion: false,
        },
      ],
      requiredUserInfo: {
        sections: [
          {
            informationChunks: [
              {
                key: 'Additional Question',
                type: 'text',
                optional: true,
              },
            ],
          },
        ],
        version: '1.0.4',
      },
      url: 'http://smarthome-plugin-yoda.smartlife.vodafo.ne',
    },
    serviceDefinition: {
      serviceUid: 'vaa',
      image: {
        id: '6182d54ac358337523a7b0f5',
        size: 395.978,
        mimeType: 'image/jpeg',
        md5Hash: 'ea1d9aa4b2ad6b61092850c930a84227',
        uploadDate: 1635964234032,
        height: 1704,
        width: 2560,
      },
      requiredFeatureSupport: [],
      countries: [
        {
          country: 'DE',
          name: 'VaaGermany2',
          description: 'VaaGermany',
          addonCard: {
            headline: 'Text',
            buttons: [
              {
                caption: 'Text',
                type: 'click2call',
                phoneNumber: '+351910833198',
              },
              {
                caption: 'Text',
                type: 'editUserInfo',
              },
              {
                caption: 'TExt',
                type: 'click2view',
                url: '',
                content: 'Text',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'Additional Question',
                    name: 'Text',
                    type: 'text',
                    optional: true,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'http://google.com',
        },
        {
          country: 'ES',
          name: 'VaaSpain',
          description: 'VaaSpain',
          addonCard: {
            headline: 'Text',
            buttons: [
              {
                caption: 'Text',
                type: 'click2call',
                phoneNumber: '351910833198',
              },
              {
                caption: 'Text',
                type: 'editUserInfo',
                phoneNumber: '351910833198',
              },
              {
                caption: 'Text',
                type: 'click2view',
                content: 'Text',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'Additional Question',
                    name: 'Text',
                    type: 'text',
                    optional: true,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'http://google.com',
        },
        {
          country: 'GB',
          name: 'test',
          description: 'test',
          addonCard: {
            headline: 'test',
            buttons: [
              {
                caption: 'test',
                type: 'click2webview',
                url: 'https://content-yoda.smartlife.vodafo.ne/service-addons/vaa',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'Additional Question',
                    type: 'text',
                    optional: true,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'https://content-yoda.smartlife.vodafo.ne/service-addons/vaa',
        },
        {
          country: 'IT',
          name: 'test',
          description: 'test',
          addonCard: {
            headline: 'test',
            buttons: [
              {
                caption: 'test',
                type: 'click2webview',
                url: 'https://content-yoda.smartlife.vodafo.ne/service-addons/vaa',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'Additional Question',
                    type: 'text',
                    optional: true,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'https://content-yoda.smartlife.vodafo.ne/service-addons/vaa',
        },
        {
          country: 'PT',
          name: 'Test',
          description: 'Test',
          addonCard: {
            headline: 'test',
            buttons: [
              {
                caption: 'test',
                type: 'click2webview',
                url: 'https://content-yoda.smartlife.vodafo.ne/service-addons/vaa',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'Additional Question',
                    name: '',
                    type: 'text',
                    optional: true,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'https://content-yoda.smartlife.vodafo.ne/service-addons/vaa',
        },
      ],
    },
  },
  {
    servicePlugin: {
      serviceUid: 'addonDummyTwo',
      manufacturer: 'Vodafone',
      flows: [
        {
          action: 'DEACTIVATE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'plugin.addon.deactivate',
              description: 'dummy addon deactivation',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'delete addon when deactivation succeeded',
              conditionOn: {
                'plugin.addon.deactivate.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when deactivation failed',
              conditionOn: {
                'plugin.addon.deactivate.success': 'NOT(true)',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
                'subscriptionInfo.erCancelTimestamp': '${nowIso8601}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['DEACTIVATION_FAILED'],
        },
        {
          action: 'ACTIVATE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'plugin.addon.activate',
              description: 'dummy addon activation',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when activation completed',
              conditionOn: {
                'plugin.addon.activate.success': 'true',
                'addon.activation.result': 'success_active',
              },
              payload: {
                status: 'ACTIVE',
                'userInfo.informationChunks': '${payload.userInfo.informationChunks}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when activation not completed',
              conditionOn: {
                'plugin.addon.activate.success': 'true',
                'addon.activation.result': 'success_pending_completion',
              },
              payload: {
                status: 'PURCHASED_PENDING_COMPLETION',
                'userInfo.informationChunks': '${payload.userInfo.informationChunks}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when missing user info',
              conditionOn: {
                'plugin.addon.activate.success': 'true',
                'addon.activation.result': 'success_pending_userinfo',
              },
              payload: {
                status: 'PURCHASED_PENDING_USERINFO',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when activation failed',
              conditionOn: {
                'plugin.addon.activate.success': 'false',
              },
              payload: {
                status: 'ACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'PURCHASED_PENDING_COMPLETION', 'ACTIVATION_FAILED'],
        },
        {
          action: 'SUSPEND',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'plugin.addon.suspend',
              description: 'dummy addon suspend',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when suspend completed',
              conditionOn: {
                'plugin.addon.suspend.success': 'true',
              },
              payload: {
                status: '${payload.initialAddonStatus}',
                'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
                'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['PURCHASED_PENDING_COMPLETION', 'PURCHASED_PENDING_USERINFO', 'ACTIVE'],
        },
        {
          action: 'UPDATE_USERINFO',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'plugin.addon.update_userinfo',
              description: 'dummy addon update user info',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when update user info succeeded',
              conditionOn: {
                'plugin.addon.update_userinfo.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
                'userInfo.informationChunks': '${payload.userInfo.informationChunks}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when update user info failed',
              conditionOn: {
                'plugin.addon.update_userinfo.success': 'false',
              },
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
        {
          action: 'CANCEL',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as DEACTIVATE',
              payload: {
                erSubscriptionStatus: 'DEACTIVATE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update userCancelTimestamp when cancellation completed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                'subscriptionInfo.userCancelTimestamp': '${nowIso8601}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.cancel',
              description: 'dummy addon cancellation',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancellation completed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['CANCELLED', 'CANCELLATION_FAILED'],
        },
        {
          action: 'RENEW',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'plugin.addon.renew',
              description: 'dummy addon renew',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when renew completed',
              conditionOn: {
                'plugin.addon.renew.success': 'true',
              },
              payload: {
                status: '${payload.initialAddonStatus}',
                'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
                'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'PURCHASED_PENDING_USERINFO', 'PURCHASED_PENDING_COMPLETION'],
        },
        {
          action: 'REVOKE_CANCELLATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as ACTIVATE',
              payload: {
                erSubscriptionStatus: 'ACTIVATE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update subscriptionInfo',
              payload: {
                'subscriptionInfo.userCancelTimestamp': '',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation completed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'CANCELLED'],
        },
        {
          action: 'FORCE_DEACTIVATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.cancelSubscription',
              description: 'Call ER charging cancel subscription service for immediate termination of subscription',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.deactivate',
              description: 'dummy addon force deactivation',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'delete addon when cancel subscription and deactivation succeeded',
              conditionOn: {
                'payments.cancelSubscription.success': 'true',
                'plugin.addon.deactivate.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancel subscription failed',
              conditionOn: {
                'payments.cancelSubscription.success': 'false',
                'plugin.addon.deactivate.success': 'true',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when deactivation failed',
              conditionOn: {
                'payments.cancelSubscription.success': 'true',
                'plugin.addon.deactivate.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when both failed',
              conditionOn: {
                'payments.cancelSubscription.success': 'false',
                'plugin.addon.deactivate.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['DEACTIVATION_FAILED'],
        },
        {
          action: 'PURCHASE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'template.purchaseAddon',
              description: 'Purchase addon',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'deviceLoad',
              description: 'Load device',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
                contactListIdValueUserInfo:
                  "${payload.userInfo.informationChunks[?(@.key=='contactListSample')]|value}",
                contactListIdUserInfo: "${payload.userInfo.informationChunks[?(@.key=='contactListSample')]|value}",
                successSubscriptionInfo: '${addonInfo.subscriptionInfo.success}',
                deviceUidAddonInfo: '${addonInfo.deviceUid}',
                productIdAddonInfo: '${addonInfo.productId:12345453}',
                dateNow: '${now}',
                dateNowIso8601: '${nowIso8601}',
                booleanTrue: '${true}',
                booleanFalse: '${false}',
                arrayLengthCollection: '${arrayLength(executionContext.subscriptionInfo.collection)}',
                arrayLengthBoolean: '${arrayLength(executionContext.subscriptionInfo.success)}',
                payloadPropertyAcr: '${payload.acr}',
                executionContextPropertyResourceId: '${executionContext.resourceId}',
                transactionEntryService: '${transaction.entryService}',
                transactionTriggeredBy: '${transaction.triggeredBy}',
                transactionAction: '${transaction.action}',
                transactionCustomerId: '${transaction.customerId}',
                ownerAddonInfo: 'ifExists(${addonInfo.owner})',
                defaultValue: '${addonInfo.anything:defaultValueHere}',
              },
              timeout: 1,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'delete addon when payment failed',
              conditionOn: {
                'purchase.success': 'NOT(true)',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.activate',
              description: 'dummy addon activation',
              conditionOn: {
                'purchase.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when missing userinfo',
              conditionOn: {
                'plugin.addon.activate.success': 'true',
                'addon.activation.result': 'success_pending_userinfo',
              },
              payload: {
                status: 'PURCHASED_PENDING_USERINFO',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when activation not completed',
              conditionOn: {
                'plugin.addon.activate.success': 'true',
                'addon.activation.result': 'success_pending_completion',
              },
              payload: {
                status: 'PURCHASED_PENDING_COMPLETION',
                'userInfo.informationChunks': '${payload.userInfo.informationChunks}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when activation completed',
              conditionOn: {
                'plugin.addon.activate.success': 'true',
                'addon.activation.result': 'success_active',
              },
              payload: {
                status: 'ACTIVE',
                'customInfo.custom': 'info',
                'userInfo.informationChunks': '${payload.userInfo.informationChunks}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when activation failed',
              conditionOn: {
                'plugin.addon.activate.success': 'false',
              },
              payload: {
                status: 'ACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['PURCHASED_PENDING_USERINFO', 'PURCHASED_PENDING_COMPLETION', 'ACTIVE'],
        },
      ],
      states: [
        {
          stateName: 'PURCHASING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'PURCHASED_PENDING_USERINFO', 'PURCHASED_PENDING_COMPLETION', 'ACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'RENEWING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'PURCHASED_PENDING_USERINFO', 'PURCHASED_PENDING_COMPLETION'],
          allowDeletion: false,
        },
        {
          stateName: 'PURCHASED_PENDING_USERINFO',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'PURCHASED_PENDING_COMPLETION', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'PURCHASED_PENDING_COMPLETION',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'COMPLETE_ACTIVATION',
              targetInterimState: 'COMPLETING_ACTIVATION',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'SUSPENDING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['PURCHASED_PENDING_COMPLETION', 'PURCHASED_PENDING_USERINFO', 'ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'COMPLETING_ACTIVATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVE',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'UPDATE_USERINFO',
              targetInterimState: 'UPDATING_USERINFO',
            },
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: true,
        },
        {
          stateName: 'UPDATING_USERINFO',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['CANCELLED', 'CANCELLATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLED',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'REVOKE_CANCELLATION',
              targetInterimState: 'REVOKING_CANCELLATION',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'DEACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['DEACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'DEACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'REVOKING_CANCELLATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: [],
          allowDeletion: false,
        },
      ],
      requiredUserInfo: {
        sections: [
          {
            informationChunks: [
              {
                key: 'Name',
                type: 'text',
                localValidation: {
                  maxLength: '128',
                  pattern: 'XlthLXpBLVpdKyQ=',
                },
                optional: false,
              },
              {
                key: 'Surname1',
                type: 'text',
                localValidation: {
                  maxLength: '128',
                  pattern: 'XlthLXpBLVpdKyQ=',
                },
                optional: false,
              },
              {
                key: 'Surname2',
                type: 'text',
                localValidation: {
                  maxLength: '128',
                  pattern: 'XlthLXpBLVpdKyQ=',
                },
                optional: false,
              },
              {
                key: 'NationalId',
                type: 'text',
                localValidation: {
                  maxLength: '10',
                  pattern: 'XlthLXpBLVowLTlfXSsk',
                },
                optional: false,
              },
              {
                key: 'Address',
                type: 'address',
                optional: false,
              },
              {
                key: 'Email',
                type: 'text',
                localValidation: {
                  maxLength: '100',
                  pattern:
                    'KD86W2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqfCIoPzpbXHgwMS1ceDA4XHgwYlx4MGNceDBlLVx4MWZceDIxXHgyMy1ceDViXHg1ZC1ceDdmXXxcXFtceDAxLVx4MDlceDBiXHgwY1x4MGUtXHg3Zl0pKiIpQCg/Oig/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP3xcWyg/Oig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT98W2EtejAtOS1dKlthLXowLTldOig/OltceDAxLVx4MDhceDBiXHgwY1x4MGUtXHgxZlx4MjEtXHg1YVx4NTMtXHg3Zl18XFxbXHgwMS1ceDA5XHgwYlx4MGNceDBlLVx4N2ZdKSspXF0p',
                },
                optional: false,
              },
              {
                key: 'Msisdn',
                type: 'text',
                localValidation: {
                  maxLength: '16',
                  numberTypes: ['MOBILE'],
                  pattern:
                    'XCsoOVs5NzZdXGR8OFs5ODc1MzBdXGR8Nls5ODddXGR8NVs5MF1cZHw0MlxkfDNbODc1XVxkfDJbOTg2NTQzMjFdXGR8OVs4NTQzMjEwXXw4WzY0MjFdfDZbNjU0MzIxMF18NVs4NzY1NDMyMV18NFs5ODc2NTQzMTBdfDNbOTY0MzIxMF18Mls3MF18N3wxKVxkezEsMTR9JA==',
                },
                optional: false,
              },
              {
                key: 'contactListSample',
                type: 'contactlist',
                localValidation: {
                  contactListTypeId: 'type002',
                },
                optional: false,
              },
            ],
          },
        ],
        version: '1.5.3',
      },
      conditions: [
        {
          key: 'jsonpath:device:status',
          value: 'ACTIVE',
          failureMessage: 'Device needs to be active to purchase this service addon.',
        },
      ],
      url: 'http://addon-plugin-stub-yoda.smartlife.vodafo.ne',
    },
    serviceDefinition: {
      serviceUid: 'addonDummyTwo',
      image: {
        id: '5bc6f6ea8f7d1300011dcbe9',
        size: 234.882,
        mimeType: 'image/jpeg',
        md5Hash: '0c427a338b20169355c84e41a6f06c27',
        uploadDate: 1539765994577,
        height: 1500,
        width: 1500,
      },
      countries: [
        {
          country: 'DE',
          name: 'Dummy-DE',
          description: 'tanjare',
          addonCard: {
            headline: 'AddonPlugin',
            buttons: [
              {
                caption: 'clickToCall',
                type: 'editUserInfo',
                phoneNumber: '+341234566789',
                url: 'https://content.smarltife.vodafo.ne',
              },
              {
                caption: 'EnterUserInfo',
                type: 'editUserInfo',
                phoneNumber: '4915202502435',
              },
              {
                caption: 'click2View',
                type: 'click2view',
                content: 'https://content.smartlife.vodafo.ne/service-addons/dummyPluginTwo',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'Name',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'Surname1',
                    name: 'test1',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'Surname2',
                    name: 'Doherty',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'NationalId',
                    name: 'IE23959222',
                    type: 'text',
                    localValidation: {
                      maxLength: '10',
                      pattern: 'XlthLXpBLVowLTlfXSsk',
                    },
                    optional: false,
                  },
                  {
                    key: 'Address',
                    name: 'address',
                    type: 'address',
                    optional: false,
                  },
                  {
                    key: 'Email',
                    name: 'matt@odoherty.com',
                    type: 'text',
                    localValidation: {
                      maxLength: '100',
                      pattern:
                        'KD86W2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqfCIoPzpbXHgwMS1ceDA4XHgwYlx4MGNceDBlLVx4MWZceDIxXHgyMy1ceDViXHg1ZC1ceDdmXXxcXFtceDAxLVx4MDlceDBiXHgwY1x4MGUtXHg3Zl0pKiIpQCg/Oig/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP3xcWyg/Oig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT98W2EtejAtOS1dKlthLXowLTldOig/OltceDAxLVx4MDhceDBiXHgwY1x4MGUtXHgxZlx4MjEtXHg1YVx4NTMtXHg3Zl18XFxbXHgwMS1ceDA5XHgwYlx4MGNceDBlLVx4N2ZdKSspXF0p',
                    },
                    optional: false,
                  },
                  {
                    key: 'Msisdn',
                    name: '1344442223333',
                    type: 'text',
                    localValidation: {
                      maxLength: '16',
                      numberTypes: ['MOBILE'],
                      pattern:
                        'XCsoOVs5NzZdXGR8OFs5ODc1MzBdXGR8Nls5ODddXGR8NVs5MF1cZHw0MlxkfDNbODc1XVxkfDJbOTg2NTQzMjFdXGR8OVs4NTQzMjEwXXw4WzY0MjFdfDZbNjU0MzIxMF18NVs4NzY1NDMyMV18NFs5ODc2NTQzMTBdfDNbOTY0MzIxMF18Mls3MF18N3wxKVxkezEsMTR9JA==',
                    },
                    optional: false,
                  },
                  {
                    key: 'contactListSample',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'type002',
                    },
                    optional: false,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'https://cone.com',
          conditions: [
            {
              key: 'jsonpath:device:status',
              value: 'ACTIVE',
              failureMessage: 'Device needs to be active to purchase this service addon.',
            },
            {
              key: 'jsonpath:device:subscriptionInfo.simActive',
              value: 'true',
              failureMessage: 'The V SIM needs to be inserted into the device and the device needs to be switched on.',
            },
          ],
        },
        {
          country: 'GB',
          name: 'UK Caser',
          description: 'UK Caser',
          addonCard: {
            headline: 'UK AddOn',
            buttons: [
              {
                caption: 'click2call',
                type: 'click2call',
                phoneNumber: '123456567',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'Name',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'Surname1',
                    name: 'Middlename',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'Surname2',
                    name: 'Lastname',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'NationalId',
                    name: 'Passport',
                    type: 'text',
                    localValidation: {
                      maxLength: '10',
                      pattern: 'XlthLXpBLVowLTlfXSsk',
                    },
                    optional: false,
                  },
                  {
                    key: 'Address',
                    name: 'Address',
                    type: 'address',
                    optional: false,
                  },
                  {
                    key: 'Email',
                    name: 'Email',
                    type: 'text',
                    localValidation: {
                      maxLength: '100',
                      pattern:
                        'KD86W2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqfCIoPzpbXHgwMS1ceDA4XHgwYlx4MGNceDBlLVx4MWZceDIxXHgyMy1ceDViXHg1ZC1ceDdmXXxcXFtceDAxLVx4MDlceDBiXHgwY1x4MGUtXHg3Zl0pKiIpQCg/Oig/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP3xcWyg/Oig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT98W2EtejAtOS1dKlthLXowLTldOig/OltceDAxLVx4MDhceDBiXHgwY1x4MGUtXHgxZlx4MjEtXHg1YVx4NTMtXHg3Zl18XFxbXHgwMS1ceDA5XHgwYlx4MGNceDBlLVx4N2ZdKSspXF0p',
                    },
                    optional: false,
                  },
                  {
                    key: 'Msisdn',
                    name: 'Mobile number',
                    type: 'text',
                    localValidation: {
                      maxLength: '16',
                      numberTypes: ['MOBILE'],
                      pattern:
                        'XCsoOVs5NzZdXGR8OFs5ODc1MzBdXGR8Nls5ODddXGR8NVs5MF1cZHw0MlxkfDNbODc1XVxkfDJbOTg2NTQzMjFdXGR8OVs4NTQzMjEwXXw4WzY0MjFdfDZbNjU0MzIxMF18NVs4NzY1NDMyMV18NFs5ODc2NTQzMTBdfDNbOTY0MzIxMF18Mls3MF18N3wxKVxkezEsMTR9JA==',
                    },
                    optional: false,
                  },
                  {
                    key: 'contactListSample',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'type002',
                    },
                    optional: false,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'http://www.tnc.com',
          conditions: [
            {
              key: 'jsonpath:device:status',
              value: 'ACTIVE',
              failureMessage: 'Device needs to be active to purchase this service addon.',
            },
          ],
        },
        {
          country: 'NL',
          name: 'Addon',
          description: 'Addon',
          addonCard: {
            headline: 'Addon',
            buttons: [
              {
                caption: 'Call USer',
                type: 'click2call',
                phoneNumber: '4915213939439',
              },
              {
                caption: 'UserInfo',
                type: 'editUserInfo',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'Name',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'Surname1',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'Surname2',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'NationalId',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '10',
                      pattern: 'XlthLXpBLVowLTlfXSsk',
                    },
                    optional: false,
                  },
                  {
                    key: 'Address',
                    name: '',
                    type: 'address',
                    optional: false,
                  },
                  {
                    key: 'Email',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '100',
                      pattern:
                        'KD86W2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqfCIoPzpbXHgwMS1ceDA4XHgwYlx4MGNceDBlLVx4MWZceDIxXHgyMy1ceDViXHg1ZC1ceDdmXXxcXFtceDAxLVx4MDlceDBiXHgwY1x4MGUtXHg3Zl0pKiIpQCg/Oig/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP3xcWyg/Oig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT98W2EtejAtOS1dKlthLXowLTldOig/OltceDAxLVx4MDhceDBiXHgwY1x4MGUtXHgxZlx4MjEtXHg1YVx4NTMtXHg3Zl18XFxbXHgwMS1ceDA5XHgwYlx4MGNceDBlLVx4N2ZdKSspXF0p',
                    },
                    optional: false,
                  },
                  {
                    key: 'Msisdn',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '16',
                      numberTypes: ['MOBILE'],
                      pattern:
                        'XCsoOVs5NzZdXGR8OFs5ODc1MzBdXGR8Nls5ODddXGR8NVs5MF1cZHw0MlxkfDNbODc1XVxkfDJbOTg2NTQzMjFdXGR8OVs4NTQzMjEwXXw4WzY0MjFdfDZbNjU0MzIxMF18NVs4NzY1NDMyMV18NFs5ODc2NTQzMTBdfDNbOTY0MzIxMF18Mls3MF18N3wxKVxkezEsMTR9JA==',
                    },
                    optional: false,
                  },
                  {
                    key: 'contactListSample',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'type002',
                    },
                    optional: false,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'https://content.smartlife.vodafo.ne/service-addons/dummyPluginTwo',
          conditions: [
            {
              key: 'jsonpath:device:status',
              value: 'ACTIVE',
              failureMessage: 'Device needs to be active to purchase this service addon.',
            },
          ],
        },
        {
          country: 'IT',
          name: 'Italy - Caser',
          description: 'Italy - Caser',
          addonCard: {
            headline: 'Caser Headline',
            buttons: [
              {
                caption: 'click2call',
                type: 'click2call',
                phoneNumber: '122323232',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'Name',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'Surname1',
                    name: 'Surname1',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'Surname2',
                    name: 'Surname2',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'NationalId',
                    name: 'Passport',
                    type: 'text',
                    localValidation: {
                      maxLength: '10',
                      pattern: 'XlthLXpBLVowLTlfXSsk',
                    },
                    optional: false,
                  },
                  {
                    key: 'Address',
                    name: 'Address',
                    type: 'address',
                    optional: false,
                  },
                  {
                    key: 'Email',
                    name: 'Email',
                    type: 'text',
                    localValidation: {
                      maxLength: '100',
                      pattern:
                        'KD86W2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqfCIoPzpbXHgwMS1ceDA4XHgwYlx4MGNceDBlLVx4MWZceDIxXHgyMy1ceDViXHg1ZC1ceDdmXXxcXFtceDAxLVx4MDlceDBiXHgwY1x4MGUtXHg3Zl0pKiIpQCg/Oig/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP3xcWyg/Oig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT98W2EtejAtOS1dKlthLXowLTldOig/OltceDAxLVx4MDhceDBiXHgwY1x4MGUtXHgxZlx4MjEtXHg1YVx4NTMtXHg3Zl18XFxbXHgwMS1ceDA5XHgwYlx4MGNceDBlLVx4N2ZdKSspXF0p',
                    },
                    optional: false,
                  },
                  {
                    key: 'Msisdn',
                    name: 'Mobile number',
                    type: 'text',
                    localValidation: {
                      maxLength: '16',
                      numberTypes: ['MOBILE'],
                      pattern:
                        'XCsoOVs5NzZdXGR8OFs5ODc1MzBdXGR8Nls5ODddXGR8NVs5MF1cZHw0MlxkfDNbODc1XVxkfDJbOTg2NTQzMjFdXGR8OVs4NTQzMjEwXXw4WzY0MjFdfDZbNjU0MzIxMF18NVs4NzY1NDMyMV18NFs5ODc2NTQzMTBdfDNbOTY0MzIxMF18Mls3MF18N3wxKVxkezEsMTR9JA==',
                    },
                    optional: false,
                  },
                  {
                    key: 'contactListSample',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'type002',
                    },
                    optional: false,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'https://content.smartlife.vodafo.ne/service-addons/dummyPluginTwo',
          conditions: [
            {
              key: 'jsonpath:device:status',
              value: 'ACTIVE',
              failureMessage: 'Device needs to be active to purchase this service addon.',
            },
          ],
        },
        {
          country: 'ZA',
          name: 'Dummy-ZA',
          description: 'Dummy-Za',
          addonCard: {
            headline: 'Dummy-ZA',
            buttons: [
              {
                caption: 'Primary CTA-Call',
                type: 'click2call',
                phoneNumber: '12345566',
              },
              {
                caption: 'Secondary CTA-URL',
                type: 'click2webview',
                url: 'http://www.google.com',
              },
              {
                caption: 'Tertiary CTA-View',
                type: 'click2view',
                content: 'http://www.google.com',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'Name',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'Surname1',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'Surname2',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern: 'XlthLXpBLVpdKyQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'NationalId',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '10',
                      pattern: 'XlthLXpBLVowLTlfXSsk',
                    },
                    optional: false,
                  },
                  {
                    key: 'Address',
                    name: '',
                    type: 'address',
                    optional: false,
                  },
                  {
                    key: 'Email',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '100',
                      pattern:
                        'KD86W2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqfCIoPzpbXHgwMS1ceDA4XHgwYlx4MGNceDBlLVx4MWZceDIxXHgyMy1ceDViXHg1ZC1ceDdmXXxcXFtceDAxLVx4MDlceDBiXHgwY1x4MGUtXHg3Zl0pKiIpQCg/Oig/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP3xcWyg/Oig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT98W2EtejAtOS1dKlthLXowLTldOig/OltceDAxLVx4MDhceDBiXHgwY1x4MGUtXHgxZlx4MjEtXHg1YVx4NTMtXHg3Zl18XFxbXHgwMS1ceDA5XHgwYlx4MGNceDBlLVx4N2ZdKSspXF0p',
                    },
                    optional: false,
                  },
                  {
                    key: 'Msisdn',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '16',
                      numberTypes: ['MOBILE'],
                      pattern:
                        'XCsoOVs5NzZdXGR8OFs5ODc1MzBdXGR8Nls5ODddXGR8NVs5MF1cZHw0MlxkfDNbODc1XVxkfDJbOTg2NTQzMjFdXGR8OVs4NTQzMjEwXXw4WzY0MjFdfDZbNjU0MzIxMF18NVs4NzY1NDMyMV18NFs5ODc2NTQzMTBdfDNbOTY0MzIxMF18Mls3MF18N3wxKVxkezEsMTR9JA==',
                    },
                    optional: false,
                  },
                  {
                    key: 'contactListSample',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'type002',
                    },
                    optional: false,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'https://content.smartlife.vodafo.ne/service-addons/dummyPluginTwo',
          conditions: [
            {
              key: 'jsonpath:device:status',
              value: 'ACTIVE',
              failureMessage: 'Device needs to be active to purchase this service addon.',
            },
          ],
        },
      ],
    },
  },
  {
    servicePlugin: {
      serviceUid: 'voice',
      manufacturer: 'Vodafone',
      flows: [
        {
          action: 'DEACTIVATE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'deviceLoad',
              description: 'Load the device from DB',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.whitelist.get',
              description: 'Get accessList based on iccid and accessListType: voice',
              conditionOn: {
                'deviceLoad.success': 'true',
              },
              payload: {
                accessListType: 'voice',
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.whitelist.get',
              description: 'Get accessList based on iccid and accessListType: sms',
              conditionOn: {
                'deviceLoad.success': 'true',
              },
              payload: {
                accessListType: 'sms',
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.sms.set.sim.details',
              description: 'Set sim details for SMS in GDSP',
              conditionOn: {
                smsAccessListLength: '1',
                'deviceLoad.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                acl: 'unpair',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.voice.set.sim.details',
              description: 'Set sim details for voice in GDSP',
              conditionOn: {
                voiceAccessListLength: '1',
                'deviceLoad.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                acl: 'unpair',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.waitForCallback',
              description: 'Wait for voice ACL change',
              conditionOn: {
                'sim.gdsp.voice.set.sim.details.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                callbackType: 'voiceAclChange',
              },
              timeout: 60000,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.checkVoiceAcl',
              description: 'Update simShadow for Voice ACL and SMS Acl Unpairing',
              conditionOn: {
                'deviceLoad.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                acl: 'unpair',
              },
              timeout: 0,
              retryInterval: 180000,
              retries: 3,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.voice.whitelist.delete',
              description:
                'Delete voice list in GDSP based on the list we have created in the step : plugin.compare.contactlist.',
              conditionOn: {
                voiceAccessListLength: '1',
                'sim.gdsp.voice.set.sim.details.success': 'true',
                'sim.gdsp.acl.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.sms.whitelist.delete',
              description:
                'Delete SMS list in GDSP based on the list we have created in the step : plugin.compare.contactlist',
              conditionOn: {
                smsAccessListLength: '1',
                'sim.gdsp.sms.set.sim.details.success': 'true',
                'sim.gdsp.acl.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'Updating status of the addon service to delete',
              conditionOn: {
                'sim.gdsp.acl.success': 'true',
                'sim.gdsp.voice.whitelist.delete.success': 'true',
                'sim.gdsp.sms.whitelist.delete.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon status to DEACTIVATION_FAILED',
              conditionOn: {
                'addonDelete.success': 'NOT(true)',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['CANCELLED'],
        },
        {
          action: 'SUSPEND',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'addonUpdate',
              description: 'update initial status when suspend',
              payload: {
                status: '${payload.initialAddonStatus}',
                'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
                'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
        {
          action: 'UPDATE_USERINFO',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'deviceLoad',
              description: 'Load the device from DB',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'contacts.retrieve',
              description: 'call trusted contact backend to fetch the contact list',
              conditionOn: {
                'deviceLoad.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                contactListId: "${payload.userInfo.informationChunks[?(@.key=='service.contactlist')]|value}",
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.prepare.contact.data',
              description:
                'prepare data for contact update based on the data we have received from contacts.retrieve step',
              conditionOn: {
                'contacts.retrieve.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.collect.recipientName',
              description: 'Collect recipientName from trusted contacts',
              conditionOn: {
                'plugin.addon.prepare.contact.data.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.prepare.deleted.recipientName',
              description: 'Collect recipientName from trusted contacts',
              conditionOn: {
                'plugin.addon.prepare.contact.data': 'true',
                'payload.sms_account_holder_on_removal': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.validate.sim.active',
              description: 'Validate simActive flag',
              conditionOn: {
                'plugin.addon.prepare.contact.data.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.whitelist.get',
              description: 'Get accessList based on iccid and accessListType: sms',
              conditionOn: {
                simActive: 'true',
              },
              payload: {
                accessListType: 'sms',
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.whitelist.get',
              description: 'Get accessList based on iccid and accessListType: voice',
              conditionOn: {
                simActive: 'true',
              },
              payload: {
                accessListType: 'voice',
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.compare.contactlist',
              description: 'Prepare contact list based on the contacts we retrieved from the previous step',
              conditionOn: {
                simActive: 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.sms.whitelist.create',
              description:
                'Create SMS list in GDSP based on the list we have created in the step : plugin.addon.compare.contactlist.',
              conditionOn: {
                'executionContext.smsAccessListLength': '0',
                'executionContext.shouldCallGdsp': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.sms.whitelist.update',
              description:
                'Update SMS list in GDSP based on the list we have created in the step : plugin.addon.compare.contactlist',
              conditionOn: {
                shouldUpdateSmsWhiteList: 'true',
                'executionContext.shouldCallGdsp': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.voice.whitelist.create',
              description:
                'Create voice list in GDSP based on the list we have created in the step : plugin.addon.compare.contactlist',
              conditionOn: {
                simActive: 'true',
                'executionContext.voiceAccessListLength': '0',
                'executionContext.shouldCallGdsp': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.waitForCallback',
              description: 'Wait for voice ACL whitelist create',
              conditionOn: {
                'sim.gdsp.voice.whitelist.create.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                callbackType: 'voiceAclWhitelistCreate',
              },
              timeout: 60000,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.voice.whitelist.update',
              description:
                'Update voice list in GDSP based on the list we have created in the step : plugin.addon.compare.contactlist.',
              conditionOn: {
                shouldUpdateVoiceWhiteList: 'true',
                'executionContext.shouldCallGdsp': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.waitForCallback',
              description: 'Wait for voice ACL whitelist update',
              conditionOn: {
                'sim.gdsp.voice.whitelist.update.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                callbackType: 'voiceAclWhitelistUpdate',
              },
              timeout: 60000,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.sms.set.sim.details',
              description: 'Set sim details for SMS in GDSP',
              conditionOn: {
                hasSmsAccessListId: 'true',
                'plugin.addon.compare.contactlist.success': 'true',
                smsAccessListLength: '0',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                acl: 'pair',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.voice.set.sim.details',
              description: 'Set sim details for voice in GDSP',
              conditionOn: {
                hasVoiceAccessListId: 'true',
                'plugin.addon.compare.contactlist.success': 'true',
                voiceAccessListLength: '0',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                acl: 'pair',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.waitForCallback',
              description: 'Wait for voice ACL change',
              conditionOn: {
                'sim.gdsp.voice.set.sim.details.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                callbackType: 'voiceAclChange',
              },
              timeout: 60000,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.checkVoiceAcl',
              description: 'Update simShadow for Voice ACL and SMS Acl Pairing',
              conditionOn: {
                'deviceLoad.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                acl: 'pair',
              },
              timeout: 0,
              retryInterval: 180000,
              retries: 3,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.compute.addonUpdate',
              description: 'Compute addonUpdate based on previous step of the addon',
              conditionOn: {
                'plugin.addon.compare.contactlist.success': 'true',
                'sim.gdsp.acl.success': 'true',
              },
              payload: {
                keyName: "${payload.userInfo.informationChunks[?(@.key=='service.contactlist')]|key}",
                keyValue: "${payload.userInfo.informationChunks[?(@.key=='service.contactlist')]|value}",
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update the Trusted Contact list  to Device.',
              conditionOn: {
                allowAddonUpdate: 'true',
                'sim.gdsp.acl.success': 'true',
              },
              payload: {
                'userInfo.informationChunks': '${executionContext.informationChunksPayload}',
                'userInfo.submittedToServicePartnerTimestamp': '${executionContext.appliedContactList.timeStamp}',
                'subscriptionInfo.contactsCreationQueue': '${executionContext.contactsCreationQueue}',
                'subscriptionInfo.lastChangeBy': '${transaction.triggeredBy}',
                'subscriptionInfo.lastChangeFrom': '${transaction.entryService}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'template.notification',
              description: 'Sends out a success notification for voice setup',
              conditionOn: {
                allowAddonUpdate: 'true',
                'sim.gdsp.acl.success': 'true',
              },
              payload: {
                translationMessageId: 'push_notification_voice_acl_success',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.compute.notification',
              description: 'Prepare contacted field in contacts',
              conditionOn: {
                allowAddonUpdate: 'true',
                'sim.gdsp.acl.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'template.notification',
              description: 'Sends out a notification for the newly added contacts',
              conditionOn: {
                shouldSendNotification: 'true',
              },
              payload: {
                translationMessageId: 'sms_vsim_trusted_contact_added',
                type: 'sms',
                bParty: '${executionContext.bPartyList[i]}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
              repeat: '${arrayLength(executionContext.bPartyList)}',
            },
            {
              name: 'plugin.addon.compute.contacted.field',
              description: 'Prepare contacted field in contacts',
              conditionOn: {
                'addonUpdate.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.update.contacted.field',
              description: 'Prepare contacted field in contacts',
              conditionOn: {
                shouldUpdateContactedField: 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update the contacted tag',
              conditionOn: {
                'plugin.addon.update.contacted.field.success': 'true',
                shouldUpdateDevice: 'true',
              },
              payload: {
                'userInfo.informationChunks': '${executionContext.userInforObject}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.collect.deleted.recipientName',
              description: 'Prepare deleted contacts recipientName',
              conditionOn: {
                'addonUpdate.success': 'true',
                'payload.sms_account_holder_on_removal': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'template.notification',
              description: 'Sends out a fail notification for voice setup',
              conditionOn: {
                allowAddonUpdate: 'NOT(true)',
              },
              payload: {
                translationMessageId: 'push_notification_voice_acl_failed',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'template.notification',
              description: 'Sends out a notification for the deleted contacts',
              conditionOn: {
                'plugin.addon.collect.deleted.recipientName.success': 'true',
              },
              payload: {
                translationMessageId: 'sms_vsim_trusted_contact_deleted',
                type: 'sms',
                bParty: '${executionContext.msisdn}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
              repeat: '${arrayLength(executionContext.recipientName)}',
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status to ACTIVE',
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
        {
          action: 'CANCEL',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as DEACTIVATE',
              payload: {
                erSubscriptionStatus: 'DEACTIVATE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancellation completed.',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'CANCELLATION_FAILED'],
        },
        {
          action: 'RENEW',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'addonUpdate',
              description: 'update status when renew completed',
              payload: {
                status: '${payload.initialAddonStatus}',
                'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
                'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
        {
          action: 'REVOKE_CANCELLATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as ACTIVATE',
              payload: {
                erSubscriptionStatus: 'ACTIVATE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation completed.',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLED',
                'subscriptionInfo.contactsCreationQueue': '${executionContext.contactsCreationQueue}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['CANCELLED'],
        },
        {
          action: 'FORCE_DEACTIVATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.cancelSubscription',
              description: 'Call ER charging cancel subscription service for immediate termination of subscription',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'deviceLoad',
              description: 'Load the device from DB',
              conditionOn: {
                'payments.cancelSubscription.success': 'true',
              },
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.whitelist.get',
              description: 'Get accessList based on iccid and accessListType: voice',
              conditionOn: {
                'deviceLoad.success': 'true',
                'payments.cancelSubscription.success': 'true',
              },
              payload: {
                accessListType: 'voice',
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.whitelist.get',
              description: 'Get accessList based on iccid and accessListType: sms',
              conditionOn: {
                'deviceLoad.success': 'true',
                'payments.cancelSubscription.success': 'true',
              },
              payload: {
                accessListType: 'sms',
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.sms.set.sim.details',
              description: 'Set sim details for SMS in GDSP',
              conditionOn: {
                smsAccessListLength: '1',
                'payments.cancelSubscription.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                acl: 'unpair',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.voice.set.sim.details',
              description: 'Set sim details for voice in GDSP',
              conditionOn: {
                voiceAccessListLength: '1',
                'payments.cancelSubscription.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                acl: 'unpair',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.waitForCallback',
              description: 'Wait for voice ACL change',
              conditionOn: {
                'sim.gdsp.voice.set.sim.details.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                callbackType: 'voiceAclChange',
              },
              timeout: 60000,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.checkVoiceAcl',
              description: 'Update simShadow for Voice ACL and SMS Acl Pairing',
              conditionOn: {
                'deviceLoad.success': 'true',
                'payments.cancelSubscription.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                acl: 'unpair',
              },
              timeout: 0,
              retryInterval: 180000,
              retries: 3,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.voice.whitelist.delete',
              description:
                'Delete voice list in GDSP based on the list we have created in the step : plugin.compare.contactlist.',
              conditionOn: {
                voiceAccessListLength: '1',
                'sim.gdsp.voice.set.sim.details.success': 'true',
                'sim.gdsp.acl.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.sms.whitelist.delete',
              description:
                'Delete SMS list in GDSP based on the list we have created in the step : plugin.compare.contactlist',
              conditionOn: {
                smsAccessListLength: '1',
                'sim.gdsp.sms.set.sim.details.success': 'true',
                'sim.gdsp.acl.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'Updating status of the addon service to delete',
              conditionOn: {
                'payments.cancelSubscription.success': 'true',
                'sim.gdsp.acl.success': 'true',
                'sim.gdsp.voice.whitelist.delete.success': 'true',
                'sim.gdsp.sms.whitelist.delete.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon status to DEACTIVATION_FAILED',
              conditionOn: {
                'addonDelete.success': 'NOT(true)',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [
            'CANCELLATION_FAILED',
            'DEACTIVATION_FAILED',
            'ACTIVATION_FAILED',
            'ACTIVE',
            'CANCELLED',
          ],
        },
        {
          action: 'PURCHASE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'template.purchaseAddon',
              description: 'Purchase addon',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'delete addon when payment failed',
              conditionOn: {
                'purchase.success': 'NOT(true)',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'deviceLoad',
              description: 'Load the device from DB',
              conditionOn: {
                'purchase.success': 'true',
              },
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'contacts.retrieve',
              description: 'call trusted contact backend to fetch the contact list',
              conditionOn: {
                'deviceLoad.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                contactListId: "${payload.userInfo.informationChunks[?(@.key=='service.contactlist')]|value}",
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.prepare.contact.data',
              description:
                'prepare data for contact update based on the data we have received from contacts.retrieve step',
              conditionOn: {
                'contacts.retrieve.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.collect.recipientName',
              description: 'Collect recipientName from trusted contacts',
              conditionOn: {
                'plugin.addon.prepare.contact.data.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.validate.sim.active',
              description: 'Validate simActive flag',
              conditionOn: {
                'plugin.addon.prepare.contact.data.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.whitelist.get',
              description: 'Get accessList based on iccid and accessListType: sms',
              conditionOn: {
                'purchase.success': 'true',
                simActive: 'true',
              },
              payload: {
                accessListType: 'sms',
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.whitelist.get',
              description: 'Get accessList based on iccid and accessListType: voice',
              conditionOn: {
                'purchase.success': 'true',
                simActive: 'true',
              },
              payload: {
                accessListType: 'voice',
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.compare.contactlist',
              description: 'Prepare contact list based on the contacts we retrieved from the previous step',
              conditionOn: {
                'purchase.success': 'true',
                simActive: 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.sms.whitelist.create',
              description:
                'Create SMS list in GDSP based on the list we have created in the step : plugin.addon.compare.contactlist.',
              conditionOn: {
                'purchase.success': 'true',
                'executionContext.smsAccessListLength': '0',
                'executionContext.shouldCallGdsp': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.sms.whitelist.update',
              description:
                'Update SMS list in GDSP based on the list we have created in the step : plugin.addon.compare.contactlist',
              conditionOn: {
                'purchase.success': 'true',
                shouldUpdateSmsWhiteList: 'true',
                'executionContext.shouldCallGdsp': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.voice.whitelist.create',
              description:
                'Create voice list in GDSP based on the list we have created in the step : plugin.addon.compare.contactlist',
              conditionOn: {
                simActive: 'true',
                'executionContext.voiceAccessListLength': '0',
                'executionContext.shouldCallGdsp': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.waitForCallback',
              description: 'Wait for voice ACL whitelist create',
              conditionOn: {
                'sim.gdsp.voice.whitelist.create.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                callbackType: 'voiceAclWhitelistCreate',
              },
              timeout: 60000,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.voice.whitelist.update',
              description:
                'Update voice list in GDSP based on the list we have created in the step : plugin.addon.compare.contactlist.',
              conditionOn: {
                'purchase.success': 'true',
                shouldUpdateVoiceWhiteList: 'true',
                'executionContext.shouldCallGdsp': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.waitForCallback',
              description: 'Wait for voice ACL whitelist update',
              conditionOn: {
                'sim.gdsp.voice.whitelist.update.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                callbackType: 'voiceAclWhitelistUpdate',
              },
              timeout: 60000,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.sms.set.sim.details',
              description: 'Set sim details for SMS in GDSP',
              conditionOn: {
                hasSmsAccessListId: 'true',
                'plugin.addon.compare.contactlist.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                acl: 'pair',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.voice.set.sim.details',
              description: 'Set sim details for voice in GDSP',
              conditionOn: {
                hasVoiceAccessListId: 'true',
                'plugin.addon.compare.contactlist.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                acl: 'pair',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.waitForCallback',
              description: 'Wait for voice ACL change',
              conditionOn: {
                'sim.gdsp.voice.set.sim.details.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                callbackType: 'voiceAclChange',
              },
              timeout: 60000,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'sim.gdsp.checkVoiceAcl',
              description: 'Update simShadow for Voice ACL and SMS Acl Pairing',
              conditionOn: {
                'purchase.success': 'true',
              },
              payload: {
                devicePropertyName: 'deviceInfo',
                acl: 'pair',
              },
              timeout: 0,
              retryInterval: 180000,
              retries: 3,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.compute.addonUpdate',
              description: 'Compute addonUpdate based on previous step of the addon',
              conditionOn: {
                'plugin.addon.compare.contactlist.success': 'true',
                'sim.gdsp.acl.success': 'true',
              },
              payload: {
                keyName: "${payload.userInfo.informationChunks[?(@.key=='service.contactlist')]|key}",
                keyValue: "${payload.userInfo.informationChunks[?(@.key=='service.contactlist')]|value}",
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update the Trusted Contact list  to Device.',
              conditionOn: {
                allowAddonUpdate: 'true',
                'sim.gdsp.acl.success': 'true',
              },
              payload: {
                'userInfo.informationChunks': '${executionContext.informationChunksPayload}',
                'userInfo.submittedToServicePartnerTimestamp': '${executionContext.appliedContactList.timeStamp}',
                'subscriptionInfo.contactsCreationQueue': '${executionContext.contactsCreationQueue}',
                status: 'ACTIVE',
                'subscriptionInfo.lastChangeBy': '${transaction.triggeredBy}',
                'subscriptionInfo.lastChangeFrom': '${transaction.entryService}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'template.notification',
              description: 'Sends out a success notification for voice setup',
              conditionOn: {
                allowAddonUpdate: 'true',
                'sim.gdsp.acl.success': 'true',
              },
              payload: {
                translationMessageId: 'push_notification_voice_acl_success',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.compute.notification',
              description: 'Prepare contacted field in contacts',
              conditionOn: {
                allowAddonUpdate: 'true',
                'sim.gdsp.acl.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'template.notification',
              description: 'Sends out a notification for the newly added contacts',
              conditionOn: {
                shouldSendNotification: 'true',
              },
              payload: {
                translationMessageId: 'sms_vsim_trusted_contact_added',
                type: 'sms',
                bParty: '${executionContext.bPartyList[i]}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
              repeat: '${arrayLength(executionContext.bPartyList)}',
            },
            {
              name: 'plugin.addon.compute.contacted.field',
              description: 'Prepare contacted field in contacts',
              conditionOn: {
                'addonUpdate.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.update.contacted.field',
              description: 'Prepare contacted field in contacts',
              conditionOn: {
                shouldUpdateContactedField: 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update the contacted tag',
              conditionOn: {
                'plugin.addon.update.contacted.field.success': 'true',
                shouldUpdateDevice: 'true',
              },
              payload: {
                'userInfo.informationChunks': '${executionContext.userInforObject}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'template.notification',
              description: 'Sends out a fail notification for voice setup',
              conditionOn: {
                allowAddonUpdate: 'NOT(true)',
              },
              payload: {
                translationMessageId: 'push_notification_voice_acl_failed',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status to ACTIVE',
              conditionOn: {
                'purchase.success': 'true',
                'plugin.addon.update.contacted.field.success': 'true',
                shouldUpdateDevice: 'true',
                'addonUpdate.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status to ACTIVATION_FAILED',
              conditionOn: {
                'purchase.success': 'NOT(true)',
              },
              payload: {
                status: 'ACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status to ACTIVATION_FAILED',
              conditionOn: {
                allowAddonUpdate: 'NOT(true)',
                'purchase.success': 'true',
              },
              payload: {
                status: 'ACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
      ],
      states: [
        {
          stateName: 'PURCHASING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'PURCHASED_PENDING_USERINFO', 'ACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'RENEWING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'PURCHASED_PENDING_USERINFO'],
          allowDeletion: false,
        },
        {
          stateName: 'PURCHASED_PENDING_USERINFO',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'SUSPENDING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'COMPLETING_ACTIVATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVE',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'UPDATE_USERINFO',
              targetInterimState: 'UPDATING_USERINFO',
            },
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: true,
        },
        {
          stateName: 'UPDATING_USERINFO',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['CANCELLED', 'CANCELLATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLED',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'REVOKE_CANCELLATION',
              targetInterimState: 'REVOKING_CANCELLATION',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'DEACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['DEACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'DEACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'REVOKING_CANCELLATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: [],
          allowDeletion: false,
        },
      ],
      requiredUserInfo: {
        sections: [
          {
            informationChunks: [
              {
                key: 'service.contactlist',
                type: 'contactlist',
                localValidation: {
                  contactListTypeId: 'type002',
                },
                optional: false,
              },
            ],
          },
        ],
        version: '1.0.0',
      },
      url: 'http://voice-addon-plugin-yoda.smartlife.vodafo.ne',
    },
    serviceDefinition: {
      serviceUid: 'voice',
      image: {
        id: '615438dac358337523a7b088',
        size: 3.341,
        mimeType: 'image/png',
        md5Hash: '5ada63a013b89866cb6ad08810224101',
        uploadDate: 1632909530705,
        height: 168,
        width: 300,
      },
      requiredFeatureSupport: [],
      countries: [
        {
          country: 'DE',
          name: 'DE',
          description: 'DE',
          addonCard: {
            headline: 'DE',
            buttons: [
              {
                caption: 'DE',
                type: 'click2call',
                phoneNumber: '+919888999',
                url: '',
                content: '',
              },
              {
                caption: 'second',
                type: 'click2view',
                url: 'testyoda',
                content: 'test',
              },
              {
                caption: 'third',
                type: 'click2webview',
                url: 'test url',
                content: 'test CTA',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'service.contactlist',
                    name: 'contactlist',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'type002',
                    },
                    optional: false,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'https://content-yoda.smartlife.vodafo.ne/service-addons/voice',
        },
        {
          country: 'ES',
          name: 'test',
          description: 'test',
          addonCard: {
            headline: 'ES',
            buttons: [
              {
                caption: 'ES',
                type: 'editUserInfo',
                phoneNumber: '',
                url: '',
              },
              {
                caption: 'ES',
                type: 'editUserInfo',
                phoneNumber: '',
                url: '',
              },
              {
                caption: 'ES',
                type: 'editUserInfo',
                phoneNumber: '',
                url: '',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'service.contactlist',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'type002',
                    },
                    optional: false,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'https://content-yoda.smartlife.vodafo.ne/service-addons/voice',
        },
      ],
    },
  },
  {
    servicePlugin: {
      serviceUid: 'vaamas',
      manufacturer: 'Vodafone',
      flows: [
        {
          action: 'DEACTIVATE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'deviceLoad',
              description: 'Load the device from DB',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.vaamas.delete.service',
              description: 'Deleting vaamas service addon at Samsung',
              payload: {
                status: 'DEACTIVATE',
                pricePlanId: '${payload.pricingText1}',
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'Updating status of the vaamas addon service to delete',
              conditionOn: {
                'plugin.addon.vaamas.delete.service.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the status of vaamas addon to DEACTIVATION_FAILED',
              conditionOn: {
                'plugin.addon.vaamas.delete.service.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [
            'ACTIVE',
            'ACTIVATION_FAILED',
            'CANCELLED',
            'CANCELLATION_FAILED',
            'DEACTIVATION_FAILED',
          ],
        },
        {
          action: 'SUSPEND',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'addonUpdate',
              description: 'update status when suspend completed',
              payload: {
                status: '${payload.initialAddonStatus}',
                'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
                'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
        {
          action: 'CANCEL',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as DEACTIVATE',
              payload: {
                erSubscriptionStatus: 'DEACTIVATE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancellation completed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'CANCELLATION_FAILED'],
        },
        {
          action: 'RENEW',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'addonUpdate',
              description: 'update status when suspend completed',
              payload: {
                status: '${payload.initialAddonStatus}',
                'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
                'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
        {
          action: 'REVOKE_CANCELLATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as ACTIVATE',
              payload: {
                erSubscriptionStatus: 'ACTIVATE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation completed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['CANCELLED'],
        },
        {
          action: 'FORCE_DEACTIVATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.cancelSubscription',
              description: 'Call ER charging cancel subscription service for immediate termination of subscription',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon status to DEACTIVATION_FAILED',
              conditionOn: {
                'payments.cancelSubscription.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.vaamas.delete.service',
              description: 'Deleting vaamas service addon at Samsung',
              conditionOn: {
                'payments.cancelSubscription.success': 'true',
              },
              payload: {
                status: 'DEACTIVATE',
                pricePlanId: '${payload.pricingText1}',
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'Updating status of the vaa addon service to delete',
              conditionOn: {
                'plugin.addon.vaamas.delete.service.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the status of vaa addon to DEACTIVATION_FAILED.',
              conditionOn: {
                'plugin.addon.vaamas.delete.service.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [
            'CANCELLATION_FAILED',
            'DEACTIVATION_FAILED',
            'ACTIVATION_FAILED',
            'ACTIVE',
            'CANCELLED',
          ],
        },
        {
          action: 'PURCHASE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'template.purchaseAddon',
              description: 'Purchase addon',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'delete addon when payment failed',
              conditionOn: {
                'purchase.success': 'NOT(true)',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.vaamas.update.service',
              description: 'Update vaamas service addon plan at samsung.',
              conditionOn: {
                'purchase.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
                pricePlanId: '${payload.pricingText1}',
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon service status to ACTIVE',
              conditionOn: {
                'purchase.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
      ],
      states: [
        {
          stateName: 'PURCHASING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'RENEWING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'SUSPENDING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'COMPLETING_ACTIVATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVE',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: true,
        },
        {
          stateName: 'CANCELLING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['CANCELLED', 'CANCELLATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLED',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'REVOKE_CANCELLATION',
              targetInterimState: 'REVOKING_CANCELLATION',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'DEACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['DEACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'DEACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'REVOKING_CANCELLATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: [],
          allowDeletion: false,
        },
      ],
      requiredUserInfo: {
        sections: [
          {
            informationChunks: [
              {
                key: 'Additional Question',
                type: 'text',
                optional: true,
              },
            ],
          },
        ],
        version: '1.0.5',
      },
      url: 'http://smarthome-plugin-yoda.smartlife.vodafo.ne',
    },
    serviceDefinition: {
      serviceUid: 'vaamas',
      image: {
        id: '6151a467c358337523a7b084',
        size: 3.341,
        mimeType: 'image/png',
        md5Hash: '5ada63a013b89866cb6ad08810224101',
        uploadDate: 1632740455262,
        height: 168,
        width: 300,
      },
      requiredFeatureSupport: ['ac', 'aa vv', ' bc'],
      countries: [
        {
          country: 'IT',
          name: 'tewst',
          description: 'tes',
          addonCard: {
            headline: 'test',
            buttons: [
              {
                caption: 'tes',
                type: 'click2webview',
                url: 'https://content-yoda.smartlife.vodafo.ne/service-addons/vaamas',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'Additional Question',
                    type: 'text',
                    optional: true,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'https://content-yoda.smartlife.vodafo.ne/service-addons/vaamas',
        },
      ],
    },
  },
  {
    servicePlugin: {
      serviceUid: 'tyco',
      manufacturer: 'Vodafone',
      flows: [
        {
          action: 'DEACTIVATE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'addonDelete',
              description: 'Updating status of the tyco addon service to delete',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [
            'CANCELLED',
            'PURCHASED_PENDING_USERINFO',
            'ACTIVE',
            'ACTIVATION_FAILED',
            'CANCELLATION_FAILED',
            'DEACTIVATION_FAILED',
          ],
        },
        {
          action: 'CANCEL',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as DEACTIVATE',
              payload: {
                erSubscriptionStatus: 'DEACTIVATE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancellation completed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'CANCELLATION_FAILED'],
        },
        {
          action: 'REVOKE_CANCELLATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as ACTIVATE',
              payload: {
                erSubscriptionStatus: 'ACTIVATE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation completed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['CANCELLED'],
        },
        {
          action: 'FORCE_DEACTIVATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.cancelSubscription',
              description: 'Call ER charging cancel subscription service for immediate termination of subscription',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon status to DEACTIVATION_FAILED',
              conditionOn: {
                'payments.cancelSubscription.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'Updating status of the vaa addon service to delete',
              conditionOn: {
                'payments.cancelSubscription.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [
            'CANCELLATION_FAILED',
            'DEACTIVATION_FAILED',
            'ACTIVATION_FAILED',
            'ACTIVE',
            'CANCELLED',
          ],
        },
        {
          action: 'PURCHASE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'template.purchaseAddon',
              description: 'Purchase addon',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.verify.userinfo',
              description: 'Checking whether user info present or not for tyco addon creation.',
              conditionOn: {
                'purchase.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'delete addon when payment failed',
              conditionOn: {
                'purchase.success': 'NOT(true)',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the status to PURCHASED_PENDING_USERINFO as the user info is not present..',
              conditionOn: {
                skip_addon_creation: 'true',
              },
              payload: {
                status: 'PURCHASED_PENDING_USERINFO',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update tyco addon status ',
              conditionOn: {
                skip_addon_creation: 'false',
              },
              payload: {
                status: 'ACTIVE',
                'userInfo.informationChunks': '${payload.userInfo.informationChunks}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
      ],
      states: [
        {
          stateName: 'PURCHASING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'PURCHASED_PENDING_USERINFO', 'ACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'RENEWING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'PURCHASED_PENDING_USERINFO'],
          allowDeletion: false,
        },
        {
          stateName: 'PURCHASED_PENDING_USERINFO',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'SUSPENDING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['PURCHASED_PENDING_USERINFO', 'ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'COMPLETING_ACTIVATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVE',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'UPDATE_USERINFO',
              targetInterimState: 'UPDATING_USERINFO',
            },
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: true,
        },
        {
          stateName: 'UPDATING_USERINFO',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['CANCELLED', 'CANCELLATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLED',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'REVOKE_CANCELLATION',
              targetInterimState: 'REVOKING_CANCELLATION',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'DEACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['DEACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'DEACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'REVOKING_CANCELLATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: [],
          allowDeletion: false,
        },
      ],
      requiredUserInfo: {
        sections: [
          {
            informationChunks: [
              {
                key: 'First Name',
                type: 'text',
                localValidation: {
                  maxLength: '50',
                  pattern: 'XihbYS16fEEtWl1bYS16fEEtWiBdKlthLXp8QS1aXSkk',
                },
                optional: false,
              },
              {
                key: 'Last Name',
                type: 'text',
                localValidation: {
                  maxLength: '50',
                  pattern: 'XihbYS16fEEtWl1bYS16fEEtWiBdKlthLXp8QS1aXSkk',
                },
                optional: false,
              },
              {
                key: 'Address Line1',
                type: 'text',
                localValidation: {
                  maxLength: '60',
                  pattern: 'XltBLVp8YS16fDAtOXxcXCd8XFwufFxcLHxcXDt8XFw6fFxcL3wgIFxcLV0rJA==',
                },
                optional: true,
              },
              {
                key: 'Address Line2',
                type: 'text',
                localValidation: {
                  maxLength: '60',
                  pattern: 'XltBLVp8YS16fDAtOXxcXCd8XFwufFxcLHxcXDt8XFw6fFxcL3wgIFxcLV0rJA==',
                },
                optional: true,
              },
              {
                key: 'Postal Code',
                type: 'text',
                localValidation: {
                  maxLength: '5',
                  pattern: 'KD8hMDEwMDB8OTk5OTkpKDBbMS05XVxkezN9fFsxLTldXGR7NH0p',
                },
                optional: true,
              },
              {
                key: 'Country',
                type: 'text',
                localValidation: {
                  maxLength: '2',
                  pattern: 'XltBLVpdezJ9JA==',
                },
                optional: true,
              },
              {
                key: 'City',
                type: 'text',
                localValidation: {
                  maxLength: '30',
                  pattern: 'XltBLVp8YS16fFxcLFwtIF0rJA==',
                },
                optional: true,
              },
              {
                key: 'Phone',
                type: 'tel',
                localValidation: {
                  maxLength: '16',
                  pattern:
                    'XihbK100OVswLTldezEwLDExfXw0OVswLTldezEwLDExfXwwMDQ5WzAtOV17MTAsMTF9fCg/ITQ5KVswLTldezEwLDExfSkk',
                },
                optional: true,
              },
              {
                key: 'Email',
                type: 'email',
                localValidation: {
                  maxLength: '100',
                  pattern:
                    'KD86W2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqfCIoPzpbXHgwMS1ceDA4XHgwYlx4MGNceDBlLVx4MWZceDIxXHgyMy1ceDViXHg1ZC1ceDdmXXxcXFtceDAxLVx4MDlceDBiXHgwY1x4MGUtXHg3Zl0pKiIpQCg/Oig/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP3xcWyg/Oig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT98W2EtejAtOS1dKlthLXowLTldOig/OltceDAxLVx4MDhceDBiXHgwY1x4MGUtXHgxZlx4MjEtXHg1YVx4NTMtXHg3Zl18XFxbXHgwMS1ceDA5XHgwYlx4MGNceDBlLVx4N2ZdKSspXF0p',
                },
                optional: false,
              },
            ],
          },
        ],
        version: '1.0.2',
      },
      url: 'http://smarthome-plugin-yoda.smartlife.vodafo.ne',
    },
    serviceDefinition: {
      serviceUid: 'tyco',
      image: {
        id: '6012ad67065d350c5c6c6625',
        size: 262.849,
        mimeType: 'image/png',
        md5Hash: 'e11f29060912d1a842600b67cd59f6ee',
        uploadDate: 1611836775712,
        height: 750,
        width: 1000,
      },
      countries: [
        {
          country: 'DE',
          name: 'j',
          description: 'j',
          addonCard: {
            headline: 'j',
            buttons: [
              {
                caption: 'j',
                type: 'click2call',
                phoneNumber: 'nunu',
              },
              {
                caption: 'j',
                type: 'editUserInfo',
              },
              {
                caption: 'j',
                type: 'editUserInfo',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'First Name',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '50',
                      pattern: 'XihbYS16fEEtWl1bYS16fEEtWiBdKlthLXp8QS1aXSkk',
                    },
                    optional: false,
                  },
                  {
                    key: 'Last Name',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '50',
                      pattern: 'XihbYS16fEEtWl1bYS16fEEtWiBdKlthLXp8QS1aXSkk',
                    },
                    optional: false,
                  },
                  {
                    key: 'Address Line1',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '60',
                      pattern: 'XltBLVp8YS16fDAtOXxcXCd8XFwufFxcLHxcXDt8XFw6fFxcL3wgIFxcLV0rJA==',
                    },
                    optional: true,
                  },
                  {
                    key: 'Address Line2',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '60',
                      pattern: 'XltBLVp8YS16fDAtOXxcXCd8XFwufFxcLHxcXDt8XFw6fFxcL3wgIFxcLV0rJA==',
                    },
                    optional: true,
                  },
                  {
                    key: 'Postal Code',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '5',
                      pattern: 'KD8hMDEwMDB8OTk5OTkpKDBbMS05XVxkezN9fFsxLTldXGR7NH0p',
                    },
                    optional: true,
                  },
                  {
                    key: 'Country',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '2',
                      pattern: 'XltBLVpdezJ9JA==',
                    },
                    optional: true,
                  },
                  {
                    key: 'City',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '30',
                      pattern: 'XltBLVp8YS16fFxcLFwtIF0rJA==',
                    },
                    optional: true,
                  },
                  {
                    key: 'Phone',
                    name: '',
                    type: 'tel',
                    localValidation: {
                      maxLength: '16',
                      pattern:
                        'XihbK100OVswLTldezEwLDExfXw0OVswLTldezEwLDExfXwwMDQ5WzAtOV17MTAsMTF9fCg/ITQ5KVswLTldezEwLDExfSkk',
                    },
                    optional: true,
                  },
                  {
                    key: 'Email',
                    name: '',
                    type: 'email',
                    localValidation: {
                      maxLength: '100',
                      pattern:
                        'KD86W2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqfCIoPzpbXHgwMS1ceDA4XHgwYlx4MGNceDBlLVx4MWZceDIxXHgyMy1ceDViXHg1ZC1ceDdmXXxcXFtceDAxLVx4MDlceDBiXHgwY1x4MGUtXHg3Zl0pKiIpQCg/Oig/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP3xcWyg/Oig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT98W2EtejAtOS1dKlthLXowLTldOig/OltceDAxLVx4MDhceDBiXHgwY1x4MGUtXHgxZlx4MjEtXHg1YVx4NTMtXHg3Zl18XFxbXHgwMS1ceDA5XHgwYlx4MGNceDBlLVx4N2ZdKSspXF0p',
                    },
                    optional: false,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'http://s.com',
        },
      ],
    },
  },
  {
    servicePlugin: {
      serviceUid: 'caser',
      manufacturer: 'Vodafone',
      flows: [
        {
          action: 'DEACTIVATE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'plugin.addon.profile.delete',
              description: 'profile deletion at caser service to confirm addon de-activation ',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'delete addon - profile deletion is successful at Caser',
              conditionOn: {
                'plugin.addon.profile.delete.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'deviceLoad',
              description: 'Load the device from DB',
              conditionOn: {
                'plugin.addon.profile.delete.success': 'true',
                'addonDelete.success': 'true',
              },
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.device.smarthome.notify.deactivation',
              description: 'Notify samsung about the successful deactivation at Caser',
              conditionOn: {
                'plugin.addon.profile.delete.success': 'true',
                'addonDelete.success': 'true',
              },
              payload: {
                status: 'DEACTIVATE',
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update addon status - profile deletion is failed at Caser',
              conditionOn: {
                'plugin.addon.profile.delete.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update addon status - profile deletion is failed at Caser',
              conditionOn: {
                'addonDelete.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [
            'CANCELLED',
            'PURCHASED_PENDING_USERINFO',
            'ACTIVE',
            'ACTIVATION_FAILED',
            'CANCELLATION_FAILED',
            'DEACTIVATION_FAILED',
          ],
        },
        {
          action: 'ACTIVATE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'plugin.addon.profile.creation',
              description: 'profile creation at caser service to confirm addon activation ',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update addon status - profile creation successful at Caser',
              conditionOn: {
                'plugin.addon.profile.creation.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
                'userInfo.informationChunks': '${payload.userInfo.informationChunks}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'deviceLoad',
              description: 'Load the device from DB',
              conditionOn: {
                'plugin.addon.profile.creation.success': 'true',
              },
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonLoadService',
              description: 'Load the addon service from DB',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.device.smarthome.notify.activation',
              description: 'Notify samsung about the successful activation at Caser',
              conditionOn: {
                'plugin.addon.profile.creation.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update addon status - profile creation failed at Caser',
              conditionOn: {
                'plugin.addon.profile.creation.success': 'false',
              },
              payload: {
                status: 'ACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'deviceLoad',
              description: 'Load the device from DB',
              conditionOn: {
                'plugin.addon.profile.creation.success': 'false',
              },
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.device.smarthome.notify.activation',
              description: 'Notify samsung about activation failed at Caser',
              conditionOn: {
                'plugin.addon.profile.creation.success': 'false',
              },
              payload: {
                status: 'MISSING_CONFIG',
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['PURCHASED_PENDING_USERINFO', 'ACTIVATION_FAILED'],
        },
        {
          action: 'SUSPEND',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'addonUpdate',
              description: 'update status when suspend completed',
              payload: {
                status: '${payload.initialAddonStatus}',
                'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
                'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'PURCHASED_PENDING_USERINFO'],
        },
        {
          action: 'UPDATE_USERINFO',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'plugin.addon.update.userinfo',
              description: 'update userinfo of existing profile at caser side',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update addon status - profile creation successful at Caser',
              conditionOn: {
                'plugin.addon.update.userinfo.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
                'userInfo.informationChunks': '${payload.userInfo.informationChunks}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update addon status - profile creation failed at Caser',
              conditionOn: {
                'plugin.addon.update.userinfo.success': 'false',
              },
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
        {
          action: 'CANCEL',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as DEACTIVATE',
              payload: {
                erSubscriptionStatus: 'DEACTIVATE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancellation completed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'PURCHASED_PENDING_USERINFO', 'CANCELLATION_FAILED'],
        },
        {
          action: 'RENEW',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'addonUpdate',
              description: 'update status when suspend completed',
              payload: {
                status: '${payload.initialAddonStatus}',
                'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
                'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'PURCHASED_PENDING_USERINFO'],
        },
        {
          action: 'REVOKE_CANCELLATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as ACTIVATE',
              payload: {
                erSubscriptionStatus: 'ACTIVATE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.getUserProfile',
              description: 'get profile from caser service',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation completed',
              conditionOn: {
                'plugin.addon.getUserProfile.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation completed',
              conditionOn: {
                'plugin.addon.getUserProfile.success': 'false',
              },
              payload: {
                status: 'PURCHASED_PENDING_USERINFO',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['CANCELLED'],
        },
        {
          action: 'FORCE_DEACTIVATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.cancelSubscription',
              description: 'Call ER charging cancel subscription service for immediate termination of subscription',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update addon status - profile deletion is failed at Caser',
              conditionOn: {
                'payments.cancelSubscription.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.getUserProfile',
              description: 'get profile from caser service',
              conditionOn: {
                'payments.cancelSubscription.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'profile does not exist at Caser',
              conditionOn: {
                'plugin.addon.getUserProfile.success': 'false',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.profile.delete',
              description: 'profile deletion at caser service to confirm addon de-activation via force deactivation',
              conditionOn: {
                'plugin.addon.getUserProfile.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'delete addon - profile deletion is successful at Caser',
              conditionOn: {
                'plugin.addon.profile.delete.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'deviceLoad',
              description: 'Load the device from DB',
              conditionOn: {
                'plugin.addon.profile.delete.success': 'true',
                'addonDelete.success': 'true',
              },
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.device.smarthome.notify.deactivation',
              description: 'Notify samsung about the successful deactivation at Caser',
              conditionOn: {
                'plugin.addon.profile.delete.success': 'true',
                'addonDelete.success': 'true',
              },
              payload: {
                status: 'DEACTIVATE',
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update addon status - profile deletion is failed at Caser',
              conditionOn: {
                'plugin.addon.profile.delete.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update addon status - addonDelete step failed at CIOT.',
              conditionOn: {
                'addonDelete.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [
            'CANCELLATION_FAILED',
            'DEACTIVATION_FAILED',
            'ACTIVATION_FAILED',
            'ACTIVE',
            'PURCHASED_PENDING_USERINFO',
            'CANCELLED',
          ],
        },
        {
          action: 'PURCHASE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'template.purchaseAddon',
              description: 'Purchase addon',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.profile.checkuserinfo',
              description: 'Checking whether user info present or not for profile creation.',
              conditionOn: {
                'purchase.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'delete addon when payment failed',
              conditionOn: {
                'purchase.success': 'NOT(true)',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the status to PURCHASED_PENDING_USERINFO as the user info is not present..',
              conditionOn: {
                skip_profile_creation: 'true',
              },
              payload: {
                status: 'PURCHASED_PENDING_USERINFO',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'deviceLoad',
              description: 'Load the device from DB',
              conditionOn: {
                skip_profile_creation: 'true',
              },
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonLoadService',
              description: 'Load the addon service from DB',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.device.smarthome.notify.activation',
              description: 'Notify samsung about activation failed at Caser',
              conditionOn: {
                skip_profile_creation: 'true',
              },
              payload: {
                status: 'MISSING_CONFIG',
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.profile.creation',
              description: 'profile creation at caser service to confirm addon activation',
              conditionOn: {
                skip_profile_creation: 'false',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update addon status - profile creation successful at Caser',
              conditionOn: {
                'plugin.addon.profile.creation.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
                'userInfo.informationChunks': '${payload.userInfo.informationChunks}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'deviceLoad',
              description: 'Load the device from DB',
              conditionOn: {
                'plugin.addon.profile.creation.success': 'true',
              },
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.device.smarthome.notify.activation',
              description: 'Notify samsung about the successful activation at Caser',
              conditionOn: {
                'plugin.addon.profile.creation.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update addon status - profile creation failed at Caser due to invalid user info.',
              conditionOn: {
                'plugin.addon.profile.creation.success': 'false',
              },
              payload: {
                status: 'ACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'deviceLoad',
              description: 'Load the device from DB',
              conditionOn: {
                'plugin.addon.profile.creation.success': 'false',
              },
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.device.smarthome.notify.activation',
              description: 'Notify samsung about activation failed at Caser',
              conditionOn: {
                'plugin.addon.profile.creation.success': 'false',
              },
              payload: {
                status: 'MISSING_CONFIG',
                devicePropertyName: 'deviceInfo',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
      ],
      states: [
        {
          stateName: 'PURCHASING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'PURCHASED_PENDING_USERINFO', 'ACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'RENEWING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'PURCHASED_PENDING_USERINFO'],
          allowDeletion: false,
        },
        {
          stateName: 'PURCHASED_PENDING_USERINFO',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'SUSPENDING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['PURCHASED_PENDING_USERINFO', 'ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'COMPLETING_ACTIVATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVE',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'UPDATE_USERINFO',
              targetInterimState: 'UPDATING_USERINFO',
            },
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: true,
        },
        {
          stateName: 'UPDATING_USERINFO',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['CANCELLED', 'CANCELLATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLED',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'REVOKE_CANCELLATION',
              targetInterimState: 'REVOKING_CANCELLATION',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'DEACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['DEACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'DEACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'REVOKING_CANCELLATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: [],
          allowDeletion: false,
        },
      ],
      requiredUserInfo: {
        sections: [
          {
            informationChunks: [
              {
                key: 'Name',
                type: 'text',
                localValidation: {
                  maxLength: '128',
                  pattern:
                    'XihbYS16fEEtWnzDoXzDqXzDrXzFhHzDsXzDs3zDunzDvHzDgXzDiXzDjXzFg3zDkXzDk3zDmnzDnHzDoHzDqHzDsnzDrHzDuXzDgHzDiHzDjHzDknzDmXxcXMKqfFxcwrBdW2EtenxBLVp8w6F8w6l8w618xYR8w7F8w7N8w7p8w7x8w4F8w4l8w418xYN8w5F8w5N8w5p8w5x8w6B8w6h8w7J8w6x8w7l8w4B8w4h8w4x8w5J8w5l8XFzCqnxcXMKwIF0qW2EtenxBLVp8w6F8w6l8w618xYR8w7F8w7N8w7p8w7x8w4F8w4l8w418xYN8w5F8w5N8w5p8w5x8w6B8w6h8w7J8w6x8w7l8w4B8w4h8w4x8w5J8w5l8XFzCqnxcXMKwXSkk',
                },
                optional: false,
              },
              {
                key: 'Surname1',
                type: 'text',
                localValidation: {
                  maxLength: '128',
                  pattern:
                    'XihbYS16fEEtWnzDoXzDqXzDrXzFhHzDsXzDs3zDunzDvHzDgXzDiXzDjXzFg3zDkXzDk3zDmnzDnHzDoHzDqHzDsnzDrHzDuXzDgHzDiHzDjHzDknzDmXxcXMKqfFxcwrBdW2EtenxBLVp8w6F8w6l8w618xYR8w7F8w7N8w7p8w7x8w4F8w4l8w418xYN8w5F8w5N8w5p8w5x8w6B8w6h8w7J8w6x8w7l8w4B8w4h8w4x8w5J8w5l8XFzCqnxcXMKwIF0qW2EtenxBLVp8w6F8w6l8w618xYR8w7F8w7N8w7p8w7x8w4F8w4l8w418xYN8w5F8w5N8w5p8w5x8w6B8w6h8w7J8w6x8w7l8w4B8w4h8w4x8w5J8w5l8XFzCqnxcXMKwXSkk',
                },
                optional: false,
              },
              {
                key: 'Surname2',
                type: 'text',
                localValidation: {
                  maxLength: '128',
                  pattern:
                    'XihbYS16fEEtWnzDoXzDqXzDrXzFhHzDsXzDs3zDunzDvHzDgXzDiXzDjXzFg3zDkXzDk3zDmnzDnHzDoHzDqHzDsnzDrHzDuXzDgHzDiHzDjHzDknzDmXxcXMKqfFxcwrBdW2EtenxBLVp8w6F8w6l8w618xYR8w7F8w7N8w7p8w7x8w4F8w4l8w418xYN8w5F8w5N8w5p8w5x8w6B8w6h8w7J8w6x8w7l8w4B8w4h8w4x8w5J8w5l8XFzCqnxcXMKwIF0qW2EtenxBLVp8w6F8w6l8w618xYR8w7F8w7N8w7p8w7x8w4F8w4l8w418xYN8w5F8w5N8w5p8w5x8w6B8w6h8w7J8w6x8w7l8w4B8w4h8w4x8w5J8w5l8XFzCqnxcXMKwXSkk',
                },
                optional: false,
              },
              {
                key: 'NationalId',
                type: 'text',
                localValidation: {
                  maxLength: '10',
                  pattern:
                    'XihbMC05XXs4fS17MCwxfVthLXp8QS1aXXsxfSl8KExbMC05XXs3fVthLXp8QS1aXXsxfSl8KEtbMC05XXs3fVthLXp8QS1aXXsxfSl8KE1bMC05XXs3fVthLXp8QS1aXXsxfSl8KChYfFl8WilbMC05XXs3fVthLXp8QS1aXXsxfSkk',
                },
                optional: false,
              },
              {
                key: 'Street Address',
                type: 'text',
                localValidation: {
                  maxLength: '100',
                  pattern:
                    'XihbQS1afGEtenwwLTl8w6F8w6l8w618xYR8w7F8w7N8w7p8w7x8w4F8w4l8w418xYN8w5F8w5N8w5p8w5x8wqp8w4d8w6d8w6B8w6h8w7J8w6x8w7l8w4B8w4h8w4x8w5J8w5l8XFwnfFxcLnxcXCx8XFw7fFxcOnxcXMK6fFxcwrB8XFwvfFxcLV1bQS1afGEtenwwLTl8w6F8w6l8w618xYR8w7F8w7N8w7p8w7x8w4F8w4l8w418xYN8w5F8w5N8w5p8w5x8wqp8w4d8w6d8w6B8w6h8w7J8w6x8w7l8w4B8w4h8w4x8w5J8w5l8XFwnfFxcLnxcXCx8XFw7fFxcOnxcXMK6fFxcwrB8XFwvfFwgXC1dKltBLVp8YS16fDAtOXzDoXzDqXzDrXzFhHzDsXzDs3zDunzDvHzDgXzDiXzDjXzFg3zDkXzDk3zDmnzDnHzCqnzDh3zDp3zDoHzDqHzDsnzDrHzDuXzDgHzDiHzDjHzDknzDmXxcXCd8XFwufFxcLHxcXDt8XFw6fFxcwrp8XFzCsHxcXC98XFwtXSkk',
                },
                optional: false,
              },
              {
                key: 'Zip Code',
                type: 'text',
                localValidation: {
                  maxLength: '5',
                  pattern: 'Xig/OjBbMS05XXxbMS00XVxkfDVbMC0yXSlcZHszfSQ=',
                },
                optional: false,
              },
              {
                key: 'City',
                type: 'text',
                localValidation: {
                  maxLength: '50',
                  pattern:
                    'XihbQS1afGEtenzDoXzDqXzDrXzDsXzDs3zDunzDvHzDgXzDiXzDjXzDkXzDk3zDmnzDnHxcXCxdW0EtWnxhLXp8w6F8w6l8w618w7F8w7N8w7p8w7x8w4F8w4l8w418w5F8w5N8w5p8w5x8XFwsIF0qW0EtWnxhLXp8w6F8w6l8w618w7F8w7N8w7p8w7x8w4F8w4l8w418w5F8w5N8w5p8w5x8XFwsXSkk',
                },
                optional: false,
              },
              {
                key: 'Province',
                type: 'text',
                localValidation: {
                  pattern:
                    'XihbQS1afGEtenzDoXzDqXzDrXzDsXzDs3zDunzDvHzDgXzDiXzDjXzDkXzDk3zDmnzDnHxcXCxdW0EtWnxhLXp8w6F8w6l8w618w7F8w7N8w7p8w7x8w4F8w4l8w418w5F8w5N8w5p8w5x8XFwsIF0qW0EtWnxhLXp8w6F8w6l8w618w7F8w7N8w7p8w7x8w4F8w4l8w418w5F8w5N8w5p8w5x8XFwsXSkk',
                },
                optional: false,
              },
              {
                key: 'MSISDN',
                type: 'tel',
                localValidation: {
                  countryCodes: ['+34'],
                  maxLength: '16',
                  pattern: 'XihbK10zNFswLTldezl9fDM0WzAtOV17OX18MDAzNFswLTldezl9fCg/ITM0KVswLTldezl9KSQ=',
                },
                optional: false,
              },
              {
                key: 'Email',
                type: 'email',
                localValidation: {
                  maxLength: '100',
                  pattern:
                    'KD86W2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqfCIoPzpbXHgwMS1ceDA4XHgwYlx4MGNceDBlLVx4MWZceDIxXHgyMy1ceDViXHg1ZC1ceDdmXXxcXFtceDAxLVx4MDlceDBiXHgwY1x4MGUtXHg3Zl0pKiIpQCg/Oig/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP3xcWyg/Oig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT98W2EtejAtOS1dKlthLXowLTldOig/OltceDAxLVx4MDhceDBiXHgwY1x4MGUtXHgxZlx4MjEtXHg1YVx4NTMtXHg3Zl18XFxbXHgwMS1ceDA5XHgwYlx4MGNceDBlLVx4N2ZdKSspXF0p',
                },
                optional: false,
              },
            ],
          },
        ],
        version: '1.4.0',
      },
      url: 'http://caser-plugin-yoda.smartlife.vodafo.ne',
    },
    serviceDefinition: {
      serviceUid: 'caser',
      image: {
        id: '5fd227f834c81e3117fe968d',
        size: 262.849,
        mimeType: 'image/png',
        md5Hash: 'e11f29060912d1a842600b67cd59f6ee',
        uploadDate: 1607608312368,
        height: 750,
        width: 1000,
      },
      requiredFeatureSupport: [],
      countries: [
        {
          country: 'ES',
          name: 'test',
          description: 'test',
          addonCard: {
            headline: 'test',
            buttons: [
              {
                caption: 'test',
                type: 'click2webview',
                url: 'https://content-yoda.smartlife.vodafo.ne/service-addons/caser',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'Name',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern:
                        'XihbYS16fEEtWnzDoXzDqXzDrXzFhHzDsXzDs3zDunzDvHzDgXzDiXzDjXzFg3zDkXzDk3zDmnzDnHzDoHzDqHzDsnzDrHzDuXzDgHzDiHzDjHzDknzDmXxcXMKqfFxcwrBdW2EtenxBLVp8w6F8w6l8w618xYR8w7F8w7N8w7p8w7x8w4F8w4l8w418xYN8w5F8w5N8w5p8w5x8w6B8w6h8w7J8w6x8w7l8w4B8w4h8w4x8w5J8w5l8XFzCqnxcXMKwIF0qW2EtenxBLVp8w6F8w6l8w618xYR8w7F8w7N8w7p8w7x8w4F8w4l8w418xYN8w5F8w5N8w5p8w5x8w6B8w6h8w7J8w6x8w7l8w4B8w4h8w4x8w5J8w5l8XFzCqnxcXMKwXSkk',
                    },
                    optional: false,
                  },
                  {
                    key: 'Surname1',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern:
                        'XihbYS16fEEtWnzDoXzDqXzDrXzFhHzDsXzDs3zDunzDvHzDgXzDiXzDjXzFg3zDkXzDk3zDmnzDnHzDoHzDqHzDsnzDrHzDuXzDgHzDiHzDjHzDknzDmXxcXMKqfFxcwrBdW2EtenxBLVp8w6F8w6l8w618xYR8w7F8w7N8w7p8w7x8w4F8w4l8w418xYN8w5F8w5N8w5p8w5x8w6B8w6h8w7J8w6x8w7l8w4B8w4h8w4x8w5J8w5l8XFzCqnxcXMKwIF0qW2EtenxBLVp8w6F8w6l8w618xYR8w7F8w7N8w7p8w7x8w4F8w4l8w418xYN8w5F8w5N8w5p8w5x8w6B8w6h8w7J8w6x8w7l8w4B8w4h8w4x8w5J8w5l8XFzCqnxcXMKwXSkk',
                    },
                    optional: false,
                  },
                  {
                    key: 'Surname2',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '128',
                      pattern:
                        'XihbYS16fEEtWnzDoXzDqXzDrXzFhHzDsXzDs3zDunzDvHzDgXzDiXzDjXzFg3zDkXzDk3zDmnzDnHzDoHzDqHzDsnzDrHzDuXzDgHzDiHzDjHzDknzDmXxcXMKqfFxcwrBdW2EtenxBLVp8w6F8w6l8w618xYR8w7F8w7N8w7p8w7x8w4F8w4l8w418xYN8w5F8w5N8w5p8w5x8w6B8w6h8w7J8w6x8w7l8w4B8w4h8w4x8w5J8w5l8XFzCqnxcXMKwIF0qW2EtenxBLVp8w6F8w6l8w618xYR8w7F8w7N8w7p8w7x8w4F8w4l8w418xYN8w5F8w5N8w5p8w5x8w6B8w6h8w7J8w6x8w7l8w4B8w4h8w4x8w5J8w5l8XFzCqnxcXMKwXSkk',
                    },
                    optional: false,
                  },
                  {
                    key: 'NationalId',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '10',
                      pattern:
                        'XihbMC05XXs4fS17MCwxfVthLXp8QS1aXXsxfSl8KExbMC05XXs3fVthLXp8QS1aXXsxfSl8KEtbMC05XXs3fVthLXp8QS1aXXsxfSl8KE1bMC05XXs3fVthLXp8QS1aXXsxfSl8KChYfFl8WilbMC05XXs3fVthLXp8QS1aXXsxfSkk',
                    },
                    optional: false,
                  },
                  {
                    key: 'Street Address',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '100',
                      pattern:
                        'XihbQS1afGEtenwwLTl8w6F8w6l8w618xYR8w7F8w7N8w7p8w7x8w4F8w4l8w418xYN8w5F8w5N8w5p8w5x8wqp8w4d8w6d8w6B8w6h8w7J8w6x8w7l8w4B8w4h8w4x8w5J8w5l8XFwnfFxcLnxcXCx8XFw7fFxcOnxcXMK6fFxcwrB8XFwvfFxcLV1bQS1afGEtenwwLTl8w6F8w6l8w618xYR8w7F8w7N8w7p8w7x8w4F8w4l8w418xYN8w5F8w5N8w5p8w5x8wqp8w4d8w6d8w6B8w6h8w7J8w6x8w7l8w4B8w4h8w4x8w5J8w5l8XFwnfFxcLnxcXCx8XFw7fFxcOnxcXMK6fFxcwrB8XFwvfFwgXC1dKltBLVp8YS16fDAtOXzDoXzDqXzDrXzFhHzDsXzDs3zDunzDvHzDgXzDiXzDjXzFg3zDkXzDk3zDmnzDnHzCqnzDh3zDp3zDoHzDqHzDsnzDrHzDuXzDgHzDiHzDjHzDknzDmXxcXCd8XFwufFxcLHxcXDt8XFw6fFxcwrp8XFzCsHxcXC98XFwtXSkk',
                    },
                    optional: false,
                  },
                  {
                    key: 'Zip Code',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '5',
                      pattern: 'Xig/OjBbMS05XXxbMS00XVxkfDVbMC0yXSlcZHszfSQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'City',
                    name: '',
                    type: 'text',
                    localValidation: {
                      maxLength: '50',
                      pattern:
                        'XihbQS1afGEtenzDoXzDqXzDrXzDsXzDs3zDunzDvHzDgXzDiXzDjXzDkXzDk3zDmnzDnHxcXCxdW0EtWnxhLXp8w6F8w6l8w618w7F8w7N8w7p8w7x8w4F8w4l8w418w5F8w5N8w5p8w5x8XFwsIF0qW0EtWnxhLXp8w6F8w6l8w618w7F8w7N8w7p8w7x8w4F8w4l8w418w5F8w5N8w5p8w5x8XFwsXSkk',
                    },
                    optional: false,
                  },
                  {
                    key: 'Province',
                    name: '',
                    type: 'text',
                    localValidation: {
                      pattern:
                        'XihbQS1afGEtenzDoXzDqXzDrXzDsXzDs3zDunzDvHzDgXzDiXzDjXzDkXzDk3zDmnzDnHxcXCxdW0EtWnxhLXp8w6F8w6l8w618w7F8w7N8w7p8w7x8w4F8w4l8w418w5F8w5N8w5p8w5x8XFwsIF0qW0EtWnxhLXp8w6F8w6l8w618w7F8w7N8w7p8w7x8w4F8w4l8w418w5F8w5N8w5p8w5x8XFwsXSkk',
                    },
                    optional: false,
                  },
                  {
                    key: 'MSISDN',
                    name: '',
                    type: 'tel',
                    localValidation: {
                      countryCodes: ['+34'],
                      maxLength: '16',
                      pattern: 'XihbK10zNFswLTldezl9fDM0WzAtOV17OX18MDAzNFswLTldezl9fCg/ITM0KVswLTldezl9KSQ=',
                    },
                    optional: false,
                  },
                  {
                    key: 'Email',
                    name: '',
                    type: 'email',
                    localValidation: {
                      maxLength: '100',
                      pattern:
                        'KD86W2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqfCIoPzpbXHgwMS1ceDA4XHgwYlx4MGNceDBlLVx4MWZceDIxXHgyMy1ceDViXHg1ZC1ceDdmXXxcXFtceDAxLVx4MDlceDBiXHgwY1x4MGUtXHg3Zl0pKiIpQCg/Oig/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP3xcWyg/Oig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT98W2EtejAtOS1dKlthLXowLTldOig/OltceDAxLVx4MDhceDBiXHgwY1x4MGUtXHgxZlx4MjEtXHg1YVx4NTMtXHg3Zl18XFxbXHgwMS1ceDA5XHgwYlx4MGNceDBlLVx4N2ZdKSspXF0p',
                    },
                    optional: false,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'https://content-yoda.smartlife.vodafo.ne/service-addons/caser',
        },
      ],
    },
  },
  {
    servicePlugin: {
      serviceUid: 'hmvs',
      manufacturer: 'vodafone_smarthome',
      flows: [
        {
          action: 'DEACTIVATE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'deviceLoad',
              description: 'Load the device from DB',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.hmvs.delete.service',
              description: 'Deleting service addon at Samsung',
              payload: {
                status: 'DEACTIVATE',
                pricePlanId: '${payload.pricingText1}',
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'Updating status of the addon service to delete',
              conditionOn: {
                'plugin.addon.hmvs.delete.service.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the status of addon to DEACTIVATION_FAILED',
              conditionOn: {
                'plugin.addon.hmvs.delete.service.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [
            'ACTIVE',
            'ACTIVATION_FAILED',
            'CANCELLED',
            'CANCELLATION_FAILED',
            'DEACTIVATION_FAILED',
          ],
        },
        {
          action: 'SUSPEND',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'addonUpdate',
              description: 'update status when suspend completed',
              payload: {
                status: '${payload.initialAddonStatus}',
                'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
                'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
        {
          action: 'CANCEL',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as DEACTIVATE',
              payload: {
                erSubscriptionStatus: 'DEACTIVATE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancellation completed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'CANCELLATION_FAILED'],
        },
        {
          action: 'RENEW',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'addonUpdate',
              description: 'update status when suspend completed',
              payload: {
                status: '${payload.initialAddonStatus}',
                'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
                'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
        {
          action: 'REVOKE_CANCELLATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as ACTIVATE',
              payload: {
                erSubscriptionStatus: 'ACTIVATE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation completed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'update status when revoke cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['CANCELLED'],
        },
        {
          action: 'FORCE_DEACTIVATION',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'payments.cancelSubscription',
              description: 'Call ER charging cancel subscription service for immediate termination of subscription',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon status to DEACTIVATION_FAILED',
              conditionOn: {
                'payments.cancelSubscription.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.hmvs.delete.service',
              description: 'Deleting service addon at Samsung',
              conditionOn: {
                'payments.cancelSubscription.success': 'true',
              },
              payload: {
                status: 'DEACTIVATE',
                pricePlanId: '${payload.pricingText1}',
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'Updating status of the addon service to delete',
              conditionOn: {
                'plugin.addon.hmvs.delete.service.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the status of addon to DEACTIVATION_FAILED.',
              conditionOn: {
                'plugin.addon.hmvs.delete.service.success': 'false',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [
            'CANCELLATION_FAILED',
            'DEACTIVATION_FAILED',
            'ACTIVATION_FAILED',
            'ACTIVE',
            'CANCELLED',
          ],
        },
        {
          action: 'PURCHASE',
          defaultRetries: 3,
          defaultRetryInterval: 60000,
          internal: false,
          steps: [
            {
              name: 'template.purchaseAddon',
              description: 'Purchase addon',
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'delete addon when payment failed',
              conditionOn: {
                'purchase.success': 'NOT(true)',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'plugin.addon.hmvs.update.service',
              description: 'Update service addon plan at samsung.',
              conditionOn: {
                'purchase.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
                pricePlanId: '${payload.pricingText1}',
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon service status to ACTIVE',
              conditionOn: {
                'purchase.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
      ],
      states: [
        {
          stateName: 'PURCHASING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'RENEWING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'SUSPENDING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'COMPLETING_ACTIVATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVE',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: true,
        },
        {
          stateName: 'CANCELLING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['CANCELLED', 'CANCELLATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLED',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'REVOKE_CANCELLATION',
              targetInterimState: 'REVOKING_CANCELLATION',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'DEACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['DEACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'DEACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'REVOKING_CANCELLATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: [],
          allowDeletion: false,
        },
      ],
      requiredUserInfo: {
        sections: [
          {
            informationChunks: [
              {
                key: 'Additional Question',
                type: 'text',
                optional: true,
              },
            ],
          },
        ],
        version: '1.3.8',
      },
      url: 'http://smarthome-plugin-yoda.smartlife.vodafo.ne',
    },
    serviceDefinition: {
      serviceUid: 'hmvs',
      image: {
        id: '5d25d16f0c7692000189c31c',
        size: 205.622,
        mimeType: 'image/png',
        md5Hash: 'af3331319aa4088fe85975a92ca54264',
        uploadDate: 1562759535231,
        height: 1080,
        width: 1920,
      },
      countries: [
        {
          country: 'GB',
          name: 'test',
          description: 'test',
          addonCard: {
            headline: 'test',
            buttons: [
              {
                caption: 'test',
                type: 'click2webview',
                url: 'https://content-yoda.smartlife.vodafo.ne/service-addons/hmvs',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'Additional Question',
                    type: 'text',
                    optional: true,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'https://content-yoda.smartlife.vodafo.ne/service-addons/hmvs',
        },
        {
          country: 'IT',
          name: 'test',
          description: 'test',
          addonCard: {
            headline: 'test',
            buttons: [
              {
                caption: 'test',
                type: 'click2webview',
                url: 'https://content-yoda.smartlife.vodafo.ne/service-addons/vaa',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'Additional Question',
                    type: 'text',
                    optional: true,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'https://content-yoda.smartlife.vodafo.ne/service-addons/vaa',
        },
      ],
    },
  },
  {
    servicePlugin: {
      serviceUid: 'vaa-full',
      manufacturer: 'Vodafone',
      flows: [
        {
          action: 'DEACTIVATE',
          defaultRetries: 5,
          defaultRetryInterval: 180000,
          internal: false,
          steps: [
            {
              name: 'vaaDeleteAllContactLists',
              description: 'Delete all contact lists linked to the VAA service from VAA backend side',
              payload: {
                wardenId: '${customInfo.wardenId}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaDeleteWarden',
              description: 'Delete the VAA service from VAA backend',
              conditionOn: {
                'vaaDeleteAllContactLists.success': 'true',
              },
              payload: {
                wardenId: '${customInfo.wardenId}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'Delete the addon instance from Addons backend side',
              conditionOn: {
                'vaaDeleteWarden.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status if addon deletion fails',
              conditionOn: {
                'addonDelete.success': 'NOT(true)',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status if addon deletion fails',
              conditionOn: {
                'vaaDeleteWarden.success': 'NOT(true)',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status if addon deletion fails',
              conditionOn: {
                'vaaDeleteAllContactLists.success': 'NOT(true)',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [
            'CANCELLED',
            'PURCHASED_PENDING_USERINFO',
            'ACTIVE',
            'ACTIVATION_FAILED',
            'CANCELLATION_FAILED',
            'DEACTIVATION_FAILED',
          ],
        },
        {
          action: 'ACTIVATE',
          defaultRetries: 5,
          defaultRetryInterval: 180000,
          internal: false,
          steps: [
            {
              name: 'deviceLoad',
              description: 'Load details of the device',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'contacts.retrieve',
              description: 'Get prime contact list details',
              payload: {
                contactListId: "${payload.userInfo.informationChunks[?(@.key=='service.primeContactslist')]|value}",
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaComputeContactListDelta',
              description:
                'Compute the differential between the already existent contact list and the newly received prime contact list',
              payload: {
                wardenId: '${customInfo.wardenId}',
                trustedContactResponse: '${executionContext.trustedContactResponse}',
                informationChunks: '${userInfo.informationChunks}',
                isPrimeContacts: 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaSetContactLists',
              description: 'Set the prime contact list details in VAA',
              conditionOn: {
                'contacts.retrieve.success': 'true',
              },
              payload: {
                wardenId: '${customInfo.wardenId}',
                contactListTypeId: '${executionContext.trustedContactResponse.contactListTypeId}',
                trustedContactResponse: '${executionContext.trustedContactResponse}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'template.notification',
              description: 'Sends SMS to added prime contact',
              conditionOn: {
                'vaaSetContactLists.success': 'true',
              },
              payload: {
                translationMessageId: 'sms_vhome_prime_contact_added',
                type: 'sms',
                bParty: '${executionContext.vaaComputeContactListDeltaResponse.addedContactsList[i]}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
              repeat: '${arrayLength(executionContext.vaaComputeContactListDeltaResponse.addedContactsList)}',
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon status to ACTIVATION_FAILED',
              conditionOn: {
                'vaaSetContactLists.success': 'NOT(true)',
              },
              payload: {
                status: 'ACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'contacts.retrieve',
              description: 'Get trusted contact list details',
              payload: {
                contactListId: "${payload.userInfo.informationChunks[?(@.key=='service.trustedContactslist')]|value}",
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaComputeContactListDelta',
              description:
                'Compute the differential between the already existent contact list and the newly received trusted contact list',
              payload: {
                wardenId: '${customInfo.wardenId}',
                trustedContactResponse: '${executionContext.trustedContactResponse}',
                informationChunks: '${userInfo.informationChunks}',
                isPrimeContacts: 'false',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaSetContactLists',
              description: 'Set the prime contact list details in VAA',
              conditionOn: {
                'contacts.retrieve.success': 'true',
              },
              payload: {
                wardenId: '${customInfo.wardenId}',
                contactListTypeId: '${executionContext.trustedContactResponse.contactListTypeId}',
                trustedContactResponse: '${executionContext.trustedContactResponse}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'template.notification',
              description: 'Sends SMS to added trusted contacts',
              conditionOn: {
                'vaaSetContactLists.success': 'true',
              },
              payload: {
                translationMessageId: 'sms_vhome_trusted_contact_added',
                type: 'sms',
                bParty: '${executionContext.vaaComputeContactListDeltaResponse.addedContactsList[i]}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
              repeat: '${arrayLength(executionContext.vaaComputeContactListDeltaResponse.addedContactsList)}',
            },
            {
              name: 'template.notification',
              description: 'Sends SMS to deleted trusted contacts',
              conditionOn: {
                'vaaSetContactLists.success': 'true',
              },
              payload: {
                translationMessageId: 'sms_vhome_trusted_contact_deleted',
                type: 'sms',
                bParty: '${executionContext.mainContactMsisdn}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
              repeat: '${arrayLength(executionContext.vaaComputeContactListDeltaResponse.deletedContactList)}',
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon status to ACTIVATION_FAILED',
              conditionOn: {
                'vaaSetContactLists.success': 'NOT(true)',
              },
              payload: {
                status: 'ACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaSearchContactLists',
              description: 'Get all contact lists bound to the Warden',
              payload: {
                wardenId: '${customInfo.wardenId}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon status to ACTIVE',
              conditionOn: {
                'executionContext.vaaSearchContactListsResultCount': 'NOT(0)',
              },
              payload: {
                status: 'ACTIVE',
                'userInfo.informationChunks': '${executionContext.informationChunksPayload}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon status to PURCHASED_PENDING_USERINFO',
              conditionOn: {
                'executionContext.vaaSearchContactListsResultCount': '0',
              },
              payload: {
                status: 'PURCHASED_PENDING_USERINFO',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['PURCHASED_PENDING_USERINFO', 'ACTIVATION_FAILED'],
        },
        {
          action: 'SUSPEND',
          defaultRetries: 5,
          defaultRetryInterval: 180000,
          internal: false,
          steps: [
            {
              name: 'addonUpdate',
              description: 'Update addon details when suspension completed',
              payload: {
                status: '${payload.initialAddonStatus}',
                'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
                'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'PURCHASED_PENDING_USERINFO'],
        },
        {
          action: 'UPDATE_USERINFO',
          defaultRetries: 5,
          defaultRetryInterval: 180000,
          internal: false,
          steps: [
            {
              name: 'deviceLoad',
              description: 'Load details of the device',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'contacts.retrieve',
              description: 'Get prime contact list details',
              payload: {
                contactListId: "${payload.userInfo.informationChunks[?(@.key=='service.primeContactslist')]|value}",
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaComputeContactListDelta',
              description:
                'Compute the differential between the already existent contact list and the newly received prime contact list',
              payload: {
                wardenId: '${customInfo.wardenId}',
                trustedContactResponse: '${executionContext.trustedContactResponse}',
                informationChunks: '${userInfo.informationChunks}',
                isPrimeContacts: 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaSetContactLists',
              description: 'Set the prime contact list details in VAA',
              payload: {
                wardenId: '${customInfo.wardenId}',
                contactListTypeId: '${executionContext.trustedContactResponse.contactListTypeId}',
                trustedContactResponse: '${executionContext.trustedContactResponse}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'template.notification',
              description: 'Sends SMS to added prime contact',
              conditionOn: {
                'vaaSetContactLists.success': 'true',
              },
              payload: {
                translationMessageId: 'sms_vhome_prime_contact_added',
                type: 'sms',
                bParty: '${executionContext.vaaComputeContactListDeltaResponse.addedContactsList[i]}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
              repeat: '${arrayLength(executionContext.vaaComputeContactListDeltaResponse.addedContactsList)}',
            },
            {
              name: 'contacts.retrieve',
              description: 'Get trusted contact list details',
              payload: {
                contactListId: "${payload.userInfo.informationChunks[?(@.key=='service.trustedContactslist')]|value}",
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaComputeContactListDelta',
              description:
                'Compute the differential between the already existent contact list and the newly received trusted contact list',
              payload: {
                wardenId: '${customInfo.wardenId}',
                trustedContactResponse: '${executionContext.trustedContactResponse}',
                informationChunks: '${userInfo.informationChunks}',
                isPrimeContacts: 'false',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaSetContactLists',
              description: 'Set the prime contact list details in VAA',
              payload: {
                wardenId: '${customInfo.wardenId}',
                contactListTypeId: '${executionContext.trustedContactResponse.contactListTypeId}',
                trustedContactResponse: '${executionContext.trustedContactResponse}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'template.notification',
              description: 'Sends SMS to added trusted contacts',
              conditionOn: {
                'vaaSetContactLists.success': 'true',
              },
              payload: {
                translationMessageId: 'sms_vhome_trusted_contact_added',
                type: 'sms',
                bParty: '${executionContext.vaaComputeContactListDeltaResponse.addedContactsList[i]}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
              repeat: '${arrayLength(executionContext.vaaComputeContactListDeltaResponse.addedContactsList)}',
            },
            {
              name: 'template.notification',
              description: 'Sends SMS to deleted trusted contacts',
              conditionOn: {
                'vaaSetContactLists.success': 'true',
              },
              payload: {
                translationMessageId: 'sms_vhome_trusted_contact_deleted',
                type: 'sms',
                bParty: '${executionContext.mainContactMsisdn}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
              repeat: '${arrayLength(executionContext.vaaComputeContactListDeltaResponse.deletedContactsList)}',
            },
            {
              name: 'vaaSearchContactLists',
              description: 'Get all contact lists bound to the Warden',
              payload: {
                wardenId: '${customInfo.wardenId}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon status to ACTIVE',
              conditionOn: {
                'executionContext.vaaSearchContactListsResultCount': 'NOT(0)',
              },
              payload: {
                status: 'ACTIVE',
                'userInfo.informationChunks': '${executionContext.informationChunksPayload}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon status to PURCHASED_PENDING_USERINFO',
              conditionOn: {
                'executionContext.vaaSearchContactListsResultCount': '0',
              },
              payload: {
                status: 'PURCHASED_PENDING_USERINFO',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
        {
          action: 'CANCEL',
          defaultRetries: 5,
          defaultRetryInterval: 180000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as DEACTIVATE',
              payload: {
                erSubscriptionStatus: 'DEACTIVATE',
              },
              timeout: 0,
              retryInterval: 300000,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update status when cancellation completed.',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'true',
              },
              payload: {
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update status when cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus.success': 'false',
              },
              payload: {
                status: 'CANCELLATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['PURCHASED_PENDING_USERINFO', 'ACTIVE', 'CANCELLATION_FAILED'],
        },
        {
          action: 'RENEW',
          defaultRetries: 5,
          defaultRetryInterval: 180000,
          internal: false,
          steps: [
            {
              name: 'addonUpdate',
              description: 'Update addon details when renew completed',
              payload: {
                status: '${payload.initialAddonStatus}',
                'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
                'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'PURCHASED_PENDING_USERINFO'],
        },
        {
          action: 'REVOKE_CANCELLATION',
          defaultRetries: 5,
          defaultRetryInterval: 180000,
          internal: false,
          steps: [
            {
              name: 'payments.changeSubscriptionStatus',
              description: 'Call ER charging update subscription service with status as ACTIVATE',
              payload: {
                erSubscriptionStatus: 'ACTIVATE',
              },
              timeout: 0,
              retryInterval: 300000,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaSearchContactLists',
              description: 'Get all contact lists bound to the Warden',
              conditionOn: {
                'payments.changeSubscriptionStatus': 'true',
              },
              payload: {
                wardenId: '${customInfo.wardenId}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status when revoke cancellation completed',
              conditionOn: {
                'executionContext.vaaSearchContactListsResultCount': 'NOT(0)',
              },
              payload: {
                status: 'ACTIVE',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description:
                'Update addon status when revoke cancellation completed (warden does not have contact lists)',
              conditionOn: {
                'executionContext.vaaSearchContactListsResultCount': '0',
              },
              payload: {
                status: 'PURCHASED_PENDING_USERINFO',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status when revoke cancellation failed',
              conditionOn: {
                'payments.changeSubscriptionStatus': 'NOT(true)',
              },
              payload: {
                status: 'CANCELLED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['CANCELLED'],
        },
        {
          action: 'FORCE_DEACTIVATION',
          defaultRetries: 5,
          defaultRetryInterval: 180000,
          internal: false,
          steps: [
            {
              name: 'payments.cancelSubscription',
              description: 'Call ER to cancel subscription service for immediate termination of subscription.',
              timeout: 0,
              retryInterval: 300000,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaDeleteAllContactLists',
              description: 'Delete all contact lists linked to the VAA service from VAA backend side',
              conditionOn: {
                'payments.cancelSubscription.success': 'true',
              },
              payload: {
                wardenId: '${customInfo.wardenId}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaDeleteWarden',
              description: 'Delete the VAA service from VAA backend',
              conditionOn: {
                'vaaDeleteAllContactLists.success': 'true',
              },
              payload: {
                wardenId: '${customInfo.wardenId}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'Delete the addon instance from Addons backend side',
              conditionOn: {
                'vaaDeleteWarden.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status if addon deletion fails',
              conditionOn: {
                'addonDelete.success': 'NOT(true)',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status if VAA service deletion fails',
              conditionOn: {
                'vaaDeleteWarden.success': 'NOT(true)',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status if VAA contact lists deletion fails',
              conditionOn: {
                'vaaDeleteAllContactLists.success': 'NOT(true)',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status if subscription cancellation fails on ER',
              conditionOn: {
                'payments.cancelSubscription': 'NOT(true)',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [
            'PURCHASED_PENDING_USERINFO',
            'ACTIVE',
            'CANCELLED',
            'ACTIVATION_FAILED',
            'DEACTIVATION_FAILED',
          ],
        },
        {
          action: 'PURCHASE',
          defaultRetries: 5,
          defaultRetryInterval: 180000,
          internal: false,
          steps: [
            {
              name: 'template.purchaseAddon',
              description: 'Purchase addon',
              timeout: 0,
              retryInterval: 300000,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'delete addon when payment failed',
              conditionOn: {
                'purchase.success': 'NOT(true)',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'deviceLoad',
              description: 'Load the device from DB',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaCreateWarden',
              description: 'Purchase VAA warden',
              conditionOn: {
                'purchase.success': 'true',
              },
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
                serviceUid: '${addonInfo.serviceUid}',
                customerId: '${addonInfo.owner}',
                customerContact: '${executionContext.deviceInfo.customInfo.primeContact.phone_number}',
                countryCode: '${executionContext.market}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status to PURCHASED_PENDING_USERINFO',
              conditionOn: {
                'vaaCreateWarden.success': 'true',
              },
              payload: {
                status: 'PURCHASED_PENDING_USERINFO',
                'customInfo.wardenId': '${executionContext.wardenId}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status to ACTIVATION_FAILED',
              conditionOn: {
                'vaaCreateWarden.success': 'NOT(true)',
              },
              payload: {
                status: 'ACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
      ],
      states: [
        {
          stateName: 'PURCHASED_PENDING_USERINFO',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVE',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'UPDATE_USERINFO',
              targetInterimState: 'UPDATING_USERINFO',
            },
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'RENEW',
              targetInterimState: 'RENEWING',
            },
            {
              actionName: 'SUSPEND',
              targetInterimState: 'SUSPENDING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLED',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'REVOKE_CANCELLATION',
              targetInterimState: 'REVOKING_CANCELLATION',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'PURCHASING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['PURCHASED_PENDING_USERINFO', 'ACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'ACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED', 'PURCHASED_PENDING_USERINFO'],
          allowDeletion: false,
        },
        {
          stateName: 'UPDATING_USERINFO',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'PURCHASED_PENDING_USERINFO'],
          allowDeletion: false,
        },
        {
          stateName: 'SUSPENDING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['PURCHASED_PENDING_USERINFO', 'ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'RENEWING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['PURCHASED_PENDING_USERINFO', 'ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['CANCELLED', 'CANCELLATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'DEACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['DEACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'REVOKING_CANCELLATION',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['PURCHASED_PENDING_USERINFO', 'ACTIVE', 'CANCELLED'],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'CANCELLATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'CANCEL',
              targetInterimState: 'CANCELLING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'DEACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
            {
              actionName: 'DEACTIVATE',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
      ],
      requiredUserInfo: {
        sections: [
          {
            informationChunks: [
              {
                key: 'service.primeContactslist',
                type: 'contactlist',
                localValidation: {
                  contactListTypeId: 'typeVaaFullVHome-PC',
                },
                optional: true,
              },
              {
                key: 'service.trustedContactslist',
                type: 'contactlist',
                localValidation: {
                  contactListTypeId: 'typeVaaFullVHome-TC',
                },
                optional: true,
              },
            ],
          },
        ],
        version: '1.1.8',
      },
      url: 'https://vaa-backend-yoda.smartlife.vodafo.ne',
    },
    serviceDefinition: {
      serviceUid: 'vaa-full',
      image: {
        id: '5e4125ac0c7692000189c32d',
        size: 20.424,
        mimeType: 'image/png',
        md5Hash: '62169d2426cb08d3c6386355baaf46fc',
        uploadDate: 1581327788903,
        height: 301,
        width: 540,
      },
      requiredFeatureSupport: [],
      countries: [
        {
          country: 'DE',
          name: 'vaa-full',
          description: 'vaa-full',
          addonCard: {
            headline: 'test',
            buttons: [
              {
                caption: 'test',
                type: 'click2call',
                phoneNumber: '111',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'service.primeContactslist',
                    name: '',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'typeVaaFullVHome-PC',
                    },
                    optional: true,
                  },
                  {
                    key: 'service.trustedContactslist',
                    name: '',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'typeVaaFullVHome-TC',
                    },
                    optional: true,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'http://www.google.pt',
        },
        {
          country: 'ES',
          name: 'vaa-full',
          description: 'test',
          addonCard: {
            headline: 'test',
            buttons: [
              {
                caption: 'test',
                type: 'click2call',
                phoneNumber: '111',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'service.primeContactslist',
                    name: 'PrimeContactList',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'typeVaaFullVHome-PC',
                    },
                    optional: true,
                  },
                  {
                    key: 'service.trustedContactslist',
                    name: 'TrustedContactList',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'typeVaaFullVHome-TC',
                    },
                    optional: true,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'http://www.google.pt',
        },
        {
          country: 'GB',
          name: 'vaa-full',
          description: 'test',
          addonCard: {
            headline: 'test',
            buttons: [
              {
                caption: 'test',
                type: 'click2call',
                phoneNumber: '111',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'service.primeContactslist',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'typeVaaFullVHome-PC',
                    },
                    optional: true,
                  },
                  {
                    key: 'service.trustedContactslist',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'typeVaaFullVHome-TC',
                    },
                    optional: true,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'http://www.google.pt',
        },
        {
          country: 'IT',
          name: 'vaa-full',
          description: 'test',
          addonCard: {
            headline: 'test',
            buttons: [
              {
                caption: 'test',
                type: 'click2call',
                phoneNumber: '111',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'service.primeContactslist',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'typeVaaFullVHome-PC',
                    },
                    optional: true,
                  },
                  {
                    key: 'service.trustedContactslist',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'typeVaaFullVHome-TC',
                    },
                    optional: true,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'http://www.google.pt',
        },
        {
          country: 'PT',
          name: 'vaa-full',
          description: 'test',
          addonCard: {
            headline: 'test',
            buttons: [
              {
                caption: '1',
                type: 'editUserInfo',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'service.primeContactslist',
                    name: '',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'typeVaaFullVHome-PC',
                    },
                    optional: true,
                  },
                  {
                    key: 'service.trustedContactslist',
                    name: '',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'typeVaaFullVHome-TC',
                    },
                    optional: true,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'http://www.test.pt',
        },
      ],
    },
  },
  {
    servicePlugin: {
      serviceUid: 'vaa-vbike2-basic',
      manufacturer: 'Vodafone',
      flows: [
        {
          action: 'ACTIVATE',
          defaultRetries: 5,
          defaultRetryInterval: 180000,
          internal: false,
          steps: [
            {
              name: 'deviceLoad',
              description: 'Load details of the device',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaCreateWarden',
              description: 'Create the VAA service on VAA backend',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
                serviceUid: '${addonInfo.serviceUid}',
                customerId: '${addonInfo.owner}',
                countryCode: '${executionContext.customerCountryCode}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status to ACTIVE',
              conditionOn: {
                'vaaCreateWarden.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
                'customInfo.wardenId': '${executionContext.wardenId}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status to ACTIVATION_FAILED',
              conditionOn: {
                'vaaCreateWarden.success': 'NOT(true)',
              },
              payload: {
                status: 'ACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [],
        },
        {
          action: 'FORCE_DEACTIVATION',
          defaultRetries: 5,
          defaultRetryInterval: 180000,
          internal: false,
          steps: [
            {
              name: 'vaaDeleteWarden',
              description: 'Delete the VAA service from VAA backend',
              payload: {
                wardenId: '${customInfo.wardenId}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'Delete the addon instance from Addons backend side',
              conditionOn: {
                'vaaDeleteWarden.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status if addon deletion fails',
              conditionOn: {
                'addonDelete.success': 'NOT(true)',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status if VAA service deletion fails',
              conditionOn: {
                'vaaDeleteWarden.success': 'NOT(true)',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'ACTIVATION_FAILED', 'DEACTIVATION_FAILED'],
        },
        {
          action: 'PURCHASE',
          defaultRetries: 5,
          defaultRetryInterval: 180000,
          internal: false,
          steps: [
            {
              name: 'deviceLoad',
              description: 'Load details of the device',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaCreateWarden',
              description: 'Create the VAA service on VAA backend',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
                serviceUid: '${addonInfo.serviceUid}',
                customerId: '${addonInfo.owner}',
                countryCode: '${executionContext.customerCountryCode}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status to ACTIVE',
              conditionOn: {
                'vaaCreateWarden.success': 'true',
              },
              payload: {
                status: 'ACTIVE',
                'customInfo.wardenId': '${executionContext.wardenId}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status to ACTIVATION_FAILED',
              conditionOn: {
                'vaaCreateWarden.success': 'NOT(true)',
              },
              payload: {
                status: 'ACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [],
        },
      ],
      states: [
        {
          stateName: 'ACTIVE',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'PURCHASING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'ACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'DEACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['DEACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'ACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'DEACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
      ],
      requiredUserInfo: {
        sections: [
          {
            informationChunks: [],
          },
        ],
        version: '1.0.0',
      },
      url: 'https://vaa-backend-yoda.smartlife.vodafo.ne',
    },
    serviceDefinition: {
      serviceUid: 'vaa-vbike2-basic',
      image: {
        id: '5e4125ac0c7692000189c32d',
        size: 20.424,
        mimeType: 'image/png',
        md5Hash: '62169d2426cb08d3c6386355baaf46fc',
        uploadDate: 1581327788903,
        height: 301,
        width: 540,
      },
      requiredFeatureSupport: [],
      countries: [
        {
          country: 'DE',
          name: 'vaa-vbike2-basic',
          description: 'test',
          addonCard: {
            headline: 'test',
            buttons: [
              {
                caption: 'test',
                type: 'click2call',
                phoneNumber: '111',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [],
              },
            ],
          },
          termsAndConditionsUrl: 'http://www.google.pt',
        },
        {
          country: 'ES',
          name: 'vaa-vbike2-basic',
          description: 'test',
          addonCard: {
            headline: 'test',
            buttons: [
              {
                caption: 'test',
                type: 'click2call',
                phoneNumber: '111',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [],
              },
            ],
          },
          termsAndConditionsUrl: 'http://www.google.pt',
        },
        {
          country: 'GB',
          name: 'vaa-vbike2-basic',
          description: 'test',
          addonCard: {
            headline: 'test',
            buttons: [
              {
                caption: 'test',
                type: 'click2call',
                phoneNumber: '111',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [],
              },
            ],
          },
          termsAndConditionsUrl: 'http://www.google.pt',
        },
        {
          country: 'IT',
          name: 'vaa-vbike2-basic',
          description: 'test',
          addonCard: {
            headline: 'test',
            buttons: [
              {
                caption: 'test',
                type: 'click2call',
                phoneNumber: '111',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [],
              },
            ],
          },
          termsAndConditionsUrl: 'http://www.google.pt',
        },
      ],
    },
  },
  {
    servicePlugin: {
      serviceUid: 'vaa-full-bundle',
      manufacturer: 'Vodafone',
      flows: [
        {
          action: 'ACTIVATE',
          defaultRetries: 5,
          defaultRetryInterval: 180000,
          internal: false,
          steps: [
            {
              name: 'deviceLoad',
              description: 'Load details of the device',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'contacts.retrieve',
              description: 'Get prime contact list details',
              payload: {
                contactListId: "${payload.userInfo.informationChunks[?(@.key=='service.primeContactslist')]|value}",
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaComputeContactListDelta',
              description:
                'Compute the differential between the already existent contact list and the newly received prime contact list',
              payload: {
                wardenId: '${customInfo.wardenId}',
                trustedContactResponse: '${executionContext.trustedContactResponse}',
                informationChunks: '${userInfo.informationChunks}',
                isPrimeContacts: 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaSetContactLists',
              description: 'Set the prime contact list details in VAA',
              payload: {
                wardenId: '${customInfo.wardenId}',
                contactListTypeId: '${executionContext.trustedContactResponse.contactListTypeId}',
                trustedContactResponse: '${executionContext.trustedContactResponse}',
                isPrimeContacts: 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'template.notification',
              description: 'Sends SMS to added prime contact',
              conditionOn: {
                'vaaSetContactLists.success': 'true',
              },
              payload: {
                translationMessageId: 'sms_vhome_prime_contact_added',
                type: 'sms',
                bParty: '${executionContext.vaaComputeContactListDeltaResponse.addedContactsList[i]}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
              repeat: '${arrayLength(executionContext.vaaComputeContactListDeltaResponse.addedContactsList)}',
            },
            {
              name: 'contacts.retrieve',
              description: 'Get trusted contact list details',
              payload: {
                contactListId: "${payload.userInfo.informationChunks[?(@.key=='service.trustedContactslist')]|value}",
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaComputeContactListDelta',
              description:
                'Compute the differential between the already existent contact list and the newly received trusted contact list',
              conditionOn: {
                'contacts.retrieve.success': 'true',
              },
              payload: {
                wardenId: '${customInfo.wardenId}',
                trustedContactResponse: '${executionContext.trustedContactResponse}',
                informationChunks: '${userInfo.informationChunks}',
                isPrimeContacts: 'false',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaSetContactLists',
              description: 'Set the trusted contact list details in VAA',
              conditionOn: {
                'vaaComputeContactListDelta.success': 'true',
                'contacts.retrieve.success': 'true',
              },
              payload: {
                wardenId: '${customInfo.wardenId}',
                contactListTypeId: '${executionContext.trustedContactResponse.contactListTypeId}',
                trustedContactResponse: '${executionContext.trustedContactResponse}',
                isPrimeContacts: 'false',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'template.notification',
              description: 'Sends SMS to added trusted contacts',
              conditionOn: {
                'vaaSetContactLists.success': 'true',
                'contacts.retrieve.success': 'true',
              },
              payload: {
                translationMessageId: 'sms_vhome_trusted_contact_added',
                type: 'sms',
                bParty: '${executionContext.vaaComputeContactListDeltaResponse.addedContactsList[i]}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
              repeat: '${arrayLength(executionContext.vaaComputeContactListDeltaResponse.addedContactsList)}',
            },
            {
              name: 'template.notification',
              description: 'Sends SMS to deleted trusted contacts',
              conditionOn: {
                'vaaSetContactLists.success': 'true',
                'contacts.retrieve.success': 'true',
              },
              payload: {
                translationMessageId: 'sms_vhome_trusted_contact_deleted',
                type: 'sms',
                bParty: '${executionContext.mainContactMsisdn}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
              repeat: '${arrayLength(executionContext.vaaComputeContactListDeltaResponse.deletedContactsList)}',
            },
            {
              name: 'vaaSearchContactLists',
              description: 'Get all contact lists bound to the Warden',
              payload: {
                wardenId: '${customInfo.wardenId}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon status to ACTIVE',
              conditionOn: {
                'executionContext.vaaSearchContactListsResultCount': 'NOT(0)',
              },
              payload: {
                status: 'ACTIVE',
                'userInfo.informationChunks': '${executionContext.informationChunksPayload}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [],
        },
        {
          action: 'UPDATE_USERINFO',
          defaultRetries: 5,
          defaultRetryInterval: 180000,
          internal: false,
          steps: [
            {
              name: 'deviceLoad',
              description: 'Load details of the device',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'contacts.retrieve',
              description: 'Get prime contact list details',
              payload: {
                contactListId: "${payload.userInfo.informationChunks[?(@.key=='service.primeContactslist')]|value}",
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaComputeContactListDelta',
              description:
                'Compute the differential between the already existent contact list and the newly received prime contact list',
              payload: {
                wardenId: '${customInfo.wardenId}',
                trustedContactResponse: '${executionContext.trustedContactResponse}',
                informationChunks: '${userInfo.informationChunks}',
                isPrimeContacts: 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaSetContactLists',
              description: 'Set the prime contact list details in VAA',
              payload: {
                wardenId: '${customInfo.wardenId}',
                contactListTypeId: '${executionContext.trustedContactResponse.contactListTypeId}',
                trustedContactResponse: '${executionContext.trustedContactResponse}',
                isPrimeContacts: 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'template.notification',
              description: 'Sends SMS to added prime contact',
              conditionOn: {
                'vaaSetContactLists.success': 'true',
              },
              payload: {
                translationMessageId: 'sms_vhome_prime_contact_added',
                type: 'sms',
                bParty: '${executionContext.vaaComputeContactListDeltaResponse.addedContactsList[i]}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
              repeat: '${arrayLength(executionContext.vaaComputeContactListDeltaResponse.addedContactsList)}',
            },
            {
              name: 'contacts.retrieve',
              description: 'Get trusted contact list details',
              payload: {
                contactListId: "${payload.userInfo.informationChunks[?(@.key=='service.trustedContactslist')]|value}",
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: true,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaComputeContactListDelta',
              description:
                'Compute the differential between the already existent contact list and the newly received trusted contact list',
              conditionOn: {
                'contacts.retrieve.success': 'true',
              },
              payload: {
                wardenId: '${customInfo.wardenId}',
                trustedContactResponse: '${executionContext.trustedContactResponse}',
                informationChunks: '${userInfo.informationChunks}',
                isPrimeContacts: 'false',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaSetContactLists',
              description: 'Set the trusted contact list details in VAA',
              conditionOn: {
                'vaaComputeContactListDelta.success': 'true',
                'contacts.retrieve.success': 'true',
              },
              payload: {
                wardenId: '${customInfo.wardenId}',
                contactListTypeId: '${executionContext.trustedContactResponse.contactListTypeId}',
                trustedContactResponse: '${executionContext.trustedContactResponse}',
                isPrimeContacts: 'false',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'template.notification',
              description: 'Sends SMS to added trusted contacts',
              conditionOn: {
                'vaaSetContactLists.success': 'true',
                'contacts.retrieve.success': 'true',
              },
              payload: {
                translationMessageId: 'sms_vhome_trusted_contact_added',
                type: 'sms',
                bParty: '${executionContext.vaaComputeContactListDeltaResponse.addedContactsList[i]}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
              repeat: '${arrayLength(executionContext.vaaComputeContactListDeltaResponse.addedContactsList)}',
            },
            {
              name: 'template.notification',
              description: 'Sends SMS to deleted trusted contacts',
              conditionOn: {
                'vaaSetContactLists.success': 'true',
                'contacts.retrieve.success': 'true',
              },
              payload: {
                translationMessageId: 'sms_vhome_trusted_contact_deleted',
                type: 'sms',
                bParty: '${executionContext.mainContactMsisdn}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
              repeat: '${arrayLength(executionContext.vaaComputeContactListDeltaResponse.deletedContactsList)}',
            },
            {
              name: 'vaaSearchContactLists',
              description: 'Get all contact lists bound to the Warden',
              payload: {
                wardenId: '${customInfo.wardenId}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Updating the addon status to ACTIVE',
              conditionOn: {
                'executionContext.vaaSearchContactListsResultCount': 'NOT(0)',
              },
              payload: {
                status: 'ACTIVE',
                'userInfo.informationChunks': '${executionContext.informationChunksPayload}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE'],
        },
        {
          action: 'FORCE_DEACTIVATION',
          defaultRetries: 5,
          defaultRetryInterval: 180000,
          internal: false,
          steps: [
            {
              name: 'vaaDeleteAllContactLists',
              description: 'Delete all contact lists linked to the VAA service from VAA backend side',
              payload: {
                wardenId: '${customInfo.wardenId}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaDeleteWarden',
              description: 'Delete the VAA service from VAA backend',
              conditionOn: {
                'vaaDeleteAllContactLists.success': 'true',
              },
              payload: {
                wardenId: '${customInfo.wardenId}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status if VAA contact lists deletion fails',
              conditionOn: {
                'vaaDeleteAllContactLists.success': 'NOT(true)',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'Delete the addon instance from Addons backend side',
              conditionOn: {
                'vaaDeleteWarden.success': 'true',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status if addon deletion fails',
              conditionOn: {
                'addonDelete.success': 'NOT(true)',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status if VAA service deletion fails',
              conditionOn: {
                'vaaDeleteWarden.success': 'NOT(true)',
              },
              payload: {
                status: 'DEACTIVATION_FAILED',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: ['ACTIVE', 'ACTIVATION_FAILED', 'DEACTIVATION_FAILED', 'PURCHASED_PENDING_USERINFO'],
        },
        {
          action: 'PURCHASE',
          defaultRetries: 5,
          defaultRetryInterval: 180000,
          internal: false,
          steps: [
            {
              name: 'deviceLoad',
              description: 'Load details of the device',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'vaaCreateWarden',
              description: 'Create the VAA service on VAA backend',
              payload: {
                deviceUid: '${addonInfo.deviceUid}',
                serviceUid: '${addonInfo.serviceUid}',
                customerId: '${addonInfo.owner}',
                countryCode: '${executionContext.customerCountryCode}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonUpdate',
              description: 'Update addon status to ACTIVE',
              conditionOn: {
                'vaaCreateWarden.success': 'true',
              },
              payload: {
                status: 'PURCHASED_PENDING_USERINFO',
                'customInfo.wardenId': '${executionContext.wardenId}',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
            {
              name: 'addonDelete',
              description: 'Delete the addon instance from Addons backend side',
              conditionOn: {
                'vaaCreateWarden.success': 'NOT(true)',
              },
              timeout: 0,
              retryInterval: 0,
              retries: 0,
              optional: false,
              beforeFlowExecution: false,
            },
          ],
          availableAddonStatuses: [],
        },
      ],
      states: [
        {
          stateName: 'PURCHASING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['PURCHASED_PENDING_USERINFO'],
          allowDeletion: true,
        },
        {
          stateName: 'PURCHASED_PENDING_USERINFO',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVE',
          stateType: 'STABLE',
          availableActions: [
            {
              actionName: 'UPDATE_USERINFO',
              targetInterimState: 'UPDATING_USERINFO',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'ACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'ACTIVATE',
              targetInterimState: 'ACTIVATING',
            },
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
        {
          stateName: 'DEACTIVATING',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['DEACTIVATION_FAILED'],
          allowDeletion: true,
        },
        {
          stateName: 'UPDATING_USERINFO',
          stateType: 'INTERIM',
          availableActions: [],
          targetStates: ['ACTIVE'],
          allowDeletion: false,
        },
        {
          stateName: 'DEACTIVATION_FAILED',
          stateType: 'ERROR',
          availableActions: [
            {
              actionName: 'FORCE_DEACTIVATION',
              targetInterimState: 'DEACTIVATING',
            },
          ],
          targetStates: [],
          allowDeletion: false,
        },
      ],
      requiredUserInfo: {
        sections: [
          {
            informationChunks: [
              {
                key: 'service.primeContactslist',
                type: 'contactlist',
                localValidation: {
                  contactListTypeId: 'typeVaaFullVHome-PC',
                },
                optional: false,
              },
              {
                key: 'service.trustedContactslist',
                type: 'contactlist',
                localValidation: {
                  contactListTypeId: 'typeVaaFullVHome-TC',
                },
                optional: true,
              },
            ],
          },
        ],
        version: '0.0.10',
      },
      url: 'https://vaa-backend-yoda.smartlife.vodafo.ne',
    },
    serviceDefinition: {
      serviceUid: 'vaa-full-bundle',
      image: {
        id: '6183c7c4c358337523a7b0f7',
        size: 3.28,
        mimeType: 'image/png',
        md5Hash: 'f8d81dd6d3a92d8836102e6ab8402b43',
        uploadDate: 1636026308307,
        height: 144,
        width: 144,
      },
      requiredFeatureSupport: [],
      countries: [
        {
          country: 'DE',
          name: 'Test',
          description: 'Teste',
          addonCard: {
            headline: 'Test',
            buttons: [
              {
                caption: 'Test',
                type: 'editUserInfo',
                phoneNumber: '',
                url: '',
              },
              {
                caption: 'Test',
                type: 'editUserInfo',
                phoneNumber: '',
                url: '',
              },
              {
                caption: 'Test',
                type: 'editUserInfo',
                phoneNumber: '',
                url: '',
              },
            ],
          },
          requiredUserInfo: {
            sections: [
              {
                informationChunks: [
                  {
                    key: 'service.primeContactslist',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'typeVaaFullVHome-PC',
                    },
                    optional: false,
                  },
                  {
                    key: 'service.trustedContactslist',
                    type: 'contactlist',
                    localValidation: {
                      contactListTypeId: 'typeVaaFullVHome-TC',
                    },
                    optional: true,
                  },
                ],
              },
            ],
          },
          termsAndConditionsUrl: 'http://google.com',
        },
      ],
    },
  },
];

export const mockCurrentCountry = {
  serviceUid: 'addonDummyPlugin',
  manufacturer: 'Vodafone',
  requiredUserInfo: {
    sections: [
      {
        informationChunks: [
          {
            key: 'Name',
            type: 'text',
            localValidation: {
              maxLength: '128',
              pattern: 'XlthLXpBLVpdKyQ=',
            },
            optional: false,
          },
          {
            key: 'Surname1',
            type: 'text',
            localValidation: {
              maxLength: '128',
              pattern: 'XlthLXpBLVpdKyQ=',
            },
            optional: false,
          },
          {
            key: 'Surname2',
            type: 'text',
            localValidation: {
              maxLength: '128',
              pattern: 'XlthLXpBLVpdKyQ=',
            },
            optional: false,
          },
          {
            key: 'NationalId',
            type: 'text',
            localValidation: {
              maxLength: '10',
              pattern: 'XlthLXpBLVowLTlfXSsk',
            },
            optional: false,
          },
          {
            key: 'Address',
            type: 'address',
            optional: false,
          },
          {
            key: 'Email',
            type: 'text',
            localValidation: {
              maxLength: '100',
              pattern:
                'KD86W2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKyg/OlwuW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi1dKykqfCIoPzpbXHgwMS1ceDA4XHgwYlx4MGNceDBlLVx4MWZceDIxXHgyMy1ceDViXHg1ZC1ceDdmXXxcXFtceDAxLVx4MDlceDBiXHgwY1x4MGUtXHg3Zl0pKiIpQCg/Oig/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP3xcWyg/Oig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT98W2EtejAtOS1dKlthLXowLTldOig/OltceDAxLVx4MDhceDBiXHgwY1x4MGUtXHgxZlx4MjEtXHg1YVx4NTMtXHg3Zl18XFxbXHgwMS1ceDA5XHgwYlx4MGNceDBlLVx4N2ZdKSspXF0p',
            },
            optional: false,
          },
          {
            key: 'Msisdn',
            type: 'text',
            localValidation: {
              maxLength: '16',
              numberTypes: ['MOBILE'],
              pattern:
                'XCsoOVs5NzZdXGR8OFs5ODc1MzBdXGR8Nls5ODddXGR8NVs5MF1cZHw0MlxkfDNbODc1XVxkfDJbOTg2NTQzMjFdXGR8OVs4NTQzMjEwXXw4WzY0MjFdfDZbNjU0MzIxMF18NVs4NzY1NDMyMV18NFs5ODc2NTQzMTBdfDNbOTY0MzIxMF18Mls3MF18N3wxKVxkezEsMTR9JA==',
            },
            optional: false,
          },
        ],
      },
    ],
    version: '1.6.0',
  },
  conditions: [
    {
      key: 'jsonpath:device:status',
      value: 'ACTIVE',
      failureMessage: 'Device needs to be active to purchase this service addon.',
    },
  ],
  url: 'http://addon-plugin-stub-yoda.smartlife.vodafo.ne',
};

export const mockSingleServiceAddon = {
  servicePlugin: {
    serviceUid: 'vaa',
    manufacturer: 'Vodafone',
    flows: [
      {
        action: 'DEACTIVATE',
        defaultRetries: 3,
        defaultRetryInterval: 60000,
        internal: false,
        steps: [
          {
            name: 'deviceLoad',
            description: 'Load the device from DB',
            payload: {
              deviceUid: '${addonInfo.deviceUid}',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
          {
            name: 'plugin.addon.vaa.delete.service',
            description: 'Deleting vaa service addon at Samsung',
            payload: {
              status: 'DEACTIVATE',
              pricePlanId: '${payload.pricingText1}',
              deviceUid: '${addonInfo.deviceUid}',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
          {
            name: 'addonDelete',
            description: 'Updating status of the vaa addon service to delete',
            conditionOn: {
              'plugin.addon.vaa.delete.service.success': 'true',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
          {
            name: 'addonUpdate',
            description: 'Updating the status of vaa addon to DEACTIVATION_FAILED',
            conditionOn: {
              'plugin.addon.vaa.delete.service.success': 'false',
            },
            payload: {
              status: 'DEACTIVATION_FAILED',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
        ],
        availableAddonStatuses: [
          'ACTIVE',
          'ACTIVATION_FAILED',
          'CANCELLED',
          'CANCELLATION_FAILED',
          'DEACTIVATION_FAILED',
        ],
      },
      {
        action: 'SUSPEND',
        defaultRetries: 3,
        defaultRetryInterval: 60000,
        internal: false,
        steps: [
          {
            name: 'addonUpdate',
            description: 'update status when suspend completed',
            payload: {
              status: '${payload.initialAddonStatus}',
              'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
              'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
        ],
        availableAddonStatuses: ['ACTIVE'],
      },
      {
        action: 'CANCEL',
        defaultRetries: 3,
        defaultRetryInterval: 60000,
        internal: false,
        steps: [
          {
            name: 'payments.changeSubscriptionStatus',
            description: 'Call ER charging update subscription service with status as DEACTIVATE',
            payload: {
              erSubscriptionStatus: 'DEACTIVATE',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
          {
            name: 'addonUpdate',
            description: 'update status when cancellation completed',
            conditionOn: {
              'payments.changeSubscriptionStatus.success': 'true',
            },
            payload: {
              status: 'CANCELLED',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
          {
            name: 'addonUpdate',
            description: 'update status when cancellation failed',
            conditionOn: {
              'payments.changeSubscriptionStatus.success': 'false',
            },
            payload: {
              status: 'CANCELLATION_FAILED',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
        ],
        availableAddonStatuses: ['ACTIVE', 'CANCELLATION_FAILED'],
      },
      {
        action: 'RENEW',
        defaultRetries: 3,
        defaultRetryInterval: 60000,
        internal: false,
        steps: [
          {
            name: 'addonUpdate',
            description: 'update status when suspend completed',
            payload: {
              status: '${payload.initialAddonStatus}',
              'subscriptionInfo.subscriptionStartDateTime': '${payload.subscriptionInfo.subscriptionStartDateTime}',
              'subscriptionInfo.subscriptionEndDateTime': '${payload.subscriptionInfo.subscriptionEndDateTime}',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
        ],
        availableAddonStatuses: ['ACTIVE'],
      },
      {
        action: 'REVOKE_CANCELLATION',
        defaultRetries: 3,
        defaultRetryInterval: 60000,
        internal: false,
        steps: [
          {
            name: 'payments.changeSubscriptionStatus',
            description: 'Call ER charging update subscription service with status as ACTIVATE',
            payload: {
              erSubscriptionStatus: 'ACTIVATE',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
          {
            name: 'addonUpdate',
            description: 'update status when revoke cancellation completed',
            conditionOn: {
              'payments.changeSubscriptionStatus.success': 'true',
            },
            payload: {
              status: 'ACTIVE',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
          {
            name: 'addonUpdate',
            description: 'update status when revoke cancellation failed',
            conditionOn: {
              'payments.changeSubscriptionStatus.success': 'false',
            },
            payload: {
              status: 'CANCELLED',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
        ],
        availableAddonStatuses: ['CANCELLED'],
      },
      {
        action: 'FORCE_DEACTIVATION',
        defaultRetries: 3,
        defaultRetryInterval: 60000,
        internal: false,
        steps: [
          {
            name: 'payments.cancelSubscription',
            description: 'Call ER charging cancel subscription service for immediate termination of subscription',
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
          {
            name: 'addonUpdate',
            description: 'Updating the addon status to DEACTIVATION_FAILED',
            conditionOn: {
              'payments.cancelSubscription.success': 'false',
            },
            payload: {
              status: 'DEACTIVATION_FAILED',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
          {
            name: 'plugin.addon.vaa.delete.service',
            description: 'Deleting vaa service addon at Samsung',
            conditionOn: {
              'payments.cancelSubscription.success': 'true',
            },
            payload: {
              status: 'DEACTIVATE',
              pricePlanId: '${payload.pricingText1}',
              deviceUid: '${addonInfo.deviceUid}',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
          {
            name: 'addonDelete',
            description: 'Updating status of the vaa addon service to delete',
            conditionOn: {
              'plugin.addon.vaa.delete.service.success': 'true',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
          {
            name: 'addonUpdate',
            description: 'Updating the status of vaa addon to DEACTIVATION_FAILED.',
            conditionOn: {
              'plugin.addon.vaa.delete.service.success': 'false',
            },
            payload: {
              status: 'DEACTIVATION_FAILED',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
        ],
        availableAddonStatuses: [
          'CANCELLATION_FAILED',
          'DEACTIVATION_FAILED',
          'ACTIVATION_FAILED',
          'ACTIVE',
          'CANCELLED',
        ],
      },
      {
        action: 'PURCHASE',
        defaultRetries: 3,
        defaultRetryInterval: 60000,
        internal: false,
        steps: [
          {
            name: 'template.purchaseAddon',
            description: 'Purchase addon',
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
          {
            name: 'addonDelete',
            description: 'delete addon when payment failed',
            conditionOn: {
              'purchase.success': 'NOT(true)',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
          {
            name: 'plugin.addon.vaa.update.service',
            description: 'Update VAA service addon plan at samsung.',
            conditionOn: {
              'purchase.success': 'true',
            },
            payload: {
              status: 'ACTIVE',
              pricePlanId: '${payload.pricingText1}',
              deviceUid: '${addonInfo.deviceUid}',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: true,
            beforeFlowExecution: false,
          },
          {
            name: 'addonUpdate',
            description: 'Updating the addon service status to ACTIVE',
            conditionOn: {
              'purchase.success': 'true',
            },
            payload: {
              status: 'ACTIVE',
            },
            timeout: 0,
            retryInterval: 0,
            retries: 0,
            optional: false,
            beforeFlowExecution: false,
          },
        ],
        availableAddonStatuses: ['ACTIVE'],
      },
    ],
    states: [
      {
        stateName: 'PURCHASING',
        stateType: 'INTERIM',
        availableActions: [],
        targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
        allowDeletion: true,
      },
      {
        stateName: 'RENEWING',
        stateType: 'INTERIM',
        availableActions: [],
        targetStates: ['ACTIVE'],
        allowDeletion: false,
      },
      {
        stateName: 'ACTIVATING',
        stateType: 'INTERIM',
        availableActions: [],
        targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
        allowDeletion: false,
      },
      {
        stateName: 'SUSPENDING',
        stateType: 'INTERIM',
        availableActions: [],
        targetStates: ['ACTIVE'],
        allowDeletion: false,
      },
      {
        stateName: 'COMPLETING_ACTIVATION',
        stateType: 'INTERIM',
        availableActions: [],
        targetStates: ['ACTIVE', 'ACTIVATION_FAILED'],
        allowDeletion: false,
      },
      {
        stateName: 'ACTIVE',
        stateType: 'STABLE',
        availableActions: [
          {
            actionName: 'CANCEL',
            targetInterimState: 'CANCELLING',
          },
          {
            actionName: 'RENEW',
            targetInterimState: 'RENEWING',
          },
          {
            actionName: 'SUSPEND',
            targetInterimState: 'SUSPENDING',
          },
          {
            actionName: 'DEACTIVATE',
            targetInterimState: 'DEACTIVATING',
          },
          {
            actionName: 'FORCE_DEACTIVATION',
            targetInterimState: 'DEACTIVATING',
          },
        ],
        targetStates: [],
        allowDeletion: false,
      },
      {
        stateName: 'ACTIVATION_FAILED',
        stateType: 'ERROR',
        availableActions: [
          {
            actionName: 'ACTIVATE',
            targetInterimState: 'ACTIVATING',
          },
          {
            actionName: 'DEACTIVATE',
            targetInterimState: 'DEACTIVATING',
          },
          {
            actionName: 'FORCE_DEACTIVATION',
            targetInterimState: 'DEACTIVATING',
          },
        ],
        targetStates: [],
        allowDeletion: true,
      },
      {
        stateName: 'CANCELLING',
        stateType: 'INTERIM',
        availableActions: [],
        targetStates: ['CANCELLED', 'CANCELLATION_FAILED'],
        allowDeletion: false,
      },
      {
        stateName: 'CANCELLED',
        stateType: 'STABLE',
        availableActions: [
          {
            actionName: 'REVOKE_CANCELLATION',
            targetInterimState: 'REVOKING_CANCELLATION',
          },
          {
            actionName: 'DEACTIVATE',
            targetInterimState: 'DEACTIVATING',
          },
          {
            actionName: 'FORCE_DEACTIVATION',
            targetInterimState: 'DEACTIVATING',
          },
        ],
        targetStates: [],
        allowDeletion: false,
      },
      {
        stateName: 'CANCELLATION_FAILED',
        stateType: 'ERROR',
        availableActions: [
          {
            actionName: 'CANCEL',
            targetInterimState: 'CANCELLING',
          },
          {
            actionName: 'DEACTIVATE',
            targetInterimState: 'DEACTIVATING',
          },
          {
            actionName: 'FORCE_DEACTIVATION',
            targetInterimState: 'DEACTIVATING',
          },
        ],
        targetStates: [],
        allowDeletion: false,
      },
      {
        stateName: 'DEACTIVATING',
        stateType: 'INTERIM',
        availableActions: [],
        targetStates: ['DEACTIVATION_FAILED'],
        allowDeletion: true,
      },
      {
        stateName: 'DEACTIVATION_FAILED',
        stateType: 'ERROR',
        availableActions: [
          {
            actionName: 'FORCE_DEACTIVATION',
            targetInterimState: 'DEACTIVATING',
          },
          {
            actionName: 'DEACTIVATE',
            targetInterimState: 'DEACTIVATING',
          },
        ],
        targetStates: [],
        allowDeletion: false,
      },
      {
        stateName: 'REVOKING_CANCELLATION',
        stateType: 'INTERIM',
        availableActions: [],
        targetStates: [],
        allowDeletion: false,
      },
    ],
    requiredUserInfo: {
      sections: [
        {
          informationChunks: [
            {
              key: 'Additional Question',
              type: 'text',
              optional: true,
            },
          ],
        },
      ],
      version: '1.0.4',
    },
    url: 'http://smarthome-plugin-yoda.smartlife.vodafo.ne',
  },
  serviceDefinition: {
    serviceUid: 'vaa',
    image: {
      id: '6182d54ac358337523a7b0f5',
      size: 395.978,
      mimeType: 'image/jpeg',
      md5Hash: 'ea1d9aa4b2ad6b61092850c930a84227',
      uploadDate: 1635964234032,
      height: 1704,
      width: 2560,
    },
    requiredFeatureSupport: [],
    countries: [
      {
        country: 'DE',
        name: 'VaaGermany2',
        description: 'VaaGermany',
        addonCard: {
          headline: 'Text',
          buttons: [
            {
              caption: 'Text',
              type: 'click2call',
              phoneNumber: '+351910833198',
            },
            {
              caption: 'Text',
              type: 'editUserInfo',
            },
            {
              caption: 'TExt',
              type: 'click2view',
              url: '',
              content: 'Text',
            },
          ],
        },
        requiredUserInfo: {
          sections: [
            {
              informationChunks: [
                {
                  key: 'Additional Question',
                  name: 'Text',
                  type: 'text',
                  optional: true,
                },
              ],
            },
          ],
        },
        termsAndConditionsUrl: 'http://google.com',
      },
      {
        country: 'ES',
        name: 'VaaSpain',
        description: 'VaaSpain',
        addonCard: {
          headline: 'Text',
          buttons: [
            {
              caption: 'Text',
              type: 'click2call',
              phoneNumber: '351910833198',
            },
            {
              caption: 'Text',
              type: 'editUserInfo',
              phoneNumber: '351910833198',
            },
            {
              caption: 'Text',
              type: 'click2view',
              content: 'Text',
            },
          ],
        },
        requiredUserInfo: {
          sections: [
            {
              informationChunks: [
                {
                  key: 'Additional Question',
                  name: 'Text',
                  type: 'text',
                  optional: true,
                },
              ],
            },
          ],
        },
        termsAndConditionsUrl: 'http://google.com',
      },
      {
        country: 'GB',
        name: 'test',
        description: 'test',
        addonCard: {
          headline: 'test',
          buttons: [
            {
              caption: 'test',
              type: 'click2webview',
              url: 'https://content-yoda.smartlife.vodafo.ne/service-addons/vaa',
            },
          ],
        },
        requiredUserInfo: {
          sections: [
            {
              informationChunks: [
                {
                  key: 'Additional Question',
                  type: 'text',
                  optional: true,
                },
              ],
            },
          ],
        },
        termsAndConditionsUrl: 'https://content-yoda.smartlife.vodafo.ne/service-addons/vaa',
      },
      {
        country: 'IT',
        name: 'test',
        description: 'test',
        addonCard: {
          headline: 'test',
          buttons: [
            {
              caption: 'test',
              type: 'click2webview',
              url: 'https://content-yoda.smartlife.vodafo.ne/service-addons/vaa',
            },
          ],
        },
        requiredUserInfo: {
          sections: [
            {
              informationChunks: [
                {
                  key: 'Additional Question',
                  type: 'text',
                  optional: true,
                },
              ],
            },
          ],
        },
        termsAndConditionsUrl: 'https://content-yoda.smartlife.vodafo.ne/service-addons/vaa',
      },
      {
        country: 'PT',
        name: 'Test',
        description: 'Test',
        addonCard: {
          headline: 'test',
          buttons: [
            {
              caption: 'test',
              type: 'click2webview',
              url: 'https://content-yoda.smartlife.vodafo.ne/service-addons/vaa',
            },
          ],
        },
        requiredUserInfo: {
          sections: [
            {
              informationChunks: [
                {
                  key: 'Additional Question',
                  name: '',
                  type: 'text',
                  optional: true,
                },
              ],
            },
          ],
        },
        termsAndConditionsUrl: 'https://content-yoda.smartlife.vodafo.ne/service-addons/vaa',
      },
    ],
  },
};
