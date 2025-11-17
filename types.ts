

export enum Category {
    Today = 'TODAY',
    DailyRoutine = 'DAILY',
    Weekly = 'WEEKLY',
    Monthly = 'MONTHLY',
    Yearly = 'YEARLY',
    CustomDate = 'CUSTOM'
}

export enum Status {
    Completed = 'COMPLETED',
    Ongoing = 'ONGOING',
    NotStarted = 'NOT_STARTED'
}

export type FilterType = 'ALL' | 'TODAY' | 'TOMORROW' | 'DATE' | Category.DailyRoutine | Category.Weekly | Category.Monthly | Category.Yearly;

export interface Task {
    id: string;
    title: string;
    description?: string;
    category: Category;
    status: Status;
    startDate: string;
    startTime: string;
    endDate?: string;
    endTime?: string;
    isRecurring: boolean;
}
