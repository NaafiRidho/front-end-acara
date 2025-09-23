import { DateValue } from "@nextui-org/react";

interface IEvent {
    _id?: string;
    name?: string;
    slug?: string;
    category?: string;
    isFeatured?: boolean | string;
    isPublish?: boolean | string;
    isOnline?: boolean | string;
    description?: string;
    startDate?: string | DateValue;
    endDate?: string | DateValuey;
    location?: {
        address: string;
        region: string;
        coordinates: number[];
    };
    banner?: string | FileList;
}

interface IEventForm extends IEvent {
    region?: string;
    address?: string;
    latitude?: string;
    longitude?: string;
}

interface IRegency {
    name: string;
    id: string;
}

export type { IEvent, IRegency, IEventForm };