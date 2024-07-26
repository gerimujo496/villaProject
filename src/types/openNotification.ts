import { NotificationPlacement } from "antd/es/notification/interface";

export interface OpenNotification {
  message: string;
  description: string;
  placement: NotificationPlacement;
}
