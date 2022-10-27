import { Status } from "../../models/ui-types";
import { colors } from "../../util/colorPalette";

export function getStatusColor(status?: Status) {
  switch (status) {
    case "success":
      return colors.notification.success500;
    case "error":
      return colors.notification.danger500;
    default:
      return "";
  }
}
