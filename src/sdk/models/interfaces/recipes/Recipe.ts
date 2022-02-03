import { Status } from '../../enums/Status';
import { RecipeStep } from './RecipeStep';

export type Recipe = {
    action: string,
    defaultRetries: number,
    defaultRetryInterval: number,
    availableDeviceStatuses: Status[],
    steps: RecipeStep[]
}