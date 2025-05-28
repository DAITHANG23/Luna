export interface StatusHistory {
  status: string;
  updatedAt: Date;
  updateBy: string;
}
export interface BookingModel {
  customer: string;
  restaurant: string;
  timeOfBooking: string;
  timeSlot: string;
  fullName: string;
  numberPhone: string;
  email: string;
  peopleQuantity: string;
  notes: string;
  status: string;
  createdAt: Date;
  statusHistory?: Array<StatusHistory>;
  _updateBy?: string;
  isReaded: boolean;
}
