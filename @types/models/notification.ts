export interface NotificationModel {
  _id: string;
  title: string;
  message: string;
  recipient: string;
  read: boolean;
  createdAt: Date;
  type: string;
  restaurant: string;
}

export interface AllNotificationResponse {
  status: string;
  results: number;
  data: { data: Array<NotificationModel> };
}

export interface CheckNotification {
  status: string;
  data: { data: NotificationModel };
}
