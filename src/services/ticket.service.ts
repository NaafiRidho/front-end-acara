import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ITicket } from "@/types/Ticket";

const ticketServices = {
    addTicket: (payload: ITicket) => instance.post(endpoint.TICKET, payload),
    deleteTicket: (id: string) => instance.delete(`${endpoint.TICKET}/${id}`),
    getTicketByEventId: (id: string) => instance.get(`${endpoint.TICKET}/${id}/events`),
    updateTicket: (id: string, payload: ITicket) => instance.put(`${endpoint.TICKET}/${id}`, payload),
    getTicketById: (id: string) => instance.get(`${endpoint.TICKET}/${id}`),
}

export default ticketServices;