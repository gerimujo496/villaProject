import { UseMutationResult } from "@tanstack/react-query";
import { Villa } from "./villa";
import { NotificationPlacement } from "antd/es/notification/interface";

export interface BuyAllVillas{
    data: Villa[],
  sellVilla: UseMutationResult<void, Error, string, unknown>,
  openNotification: (
    message: string,
    description: string,
    placement: NotificationPlacement
  ) => void,
  removeVillaFromBuyList: (id: string) => void
}