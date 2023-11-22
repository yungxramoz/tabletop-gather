import { Model } from '../utils/types';
import { Gathering } from './gathering.dto';
import { PlanDto } from './plan.dto';

/**
 * Dto for creating plans.
 *
 * @property {{ date: Gathering['date'], startTime: Gathering['startTime'] }[]} gatherings - The gatherings of the plan
 * @extends {PlanDto} - {@see {@link PlanDto}}
 */
export type CreatePlanDto = Omit<PlanDto, 'gatherings'> & {
  gatherings: {
    date: Gathering['date'];
    startTime: Gathering['startTime'];
  }[];
};

export type CreatePlan = Model<CreatePlanDto>;
