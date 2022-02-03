import debuggerUsers from '../constants/allowedDebuggUsers';

function usePermission () {

  function hasPermission(permission: string, permissionList: string[]): boolean{
    return permissionList?.includes(permission);
  }

  function hasDebugFeaturesPermission(email :string) :boolean {
    return debuggerUsers && debuggerUsers.length > 0 && debuggerUsers.includes(email);
  }
  
  return [hasPermission, hasDebugFeaturesPermission];
}

export default usePermission;
