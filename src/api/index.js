import chartResponse from "./response";
import { lineChartDataFormat } from "../helpers";

export const fetchAPI = {
  _get: () => {
    return lineChartDataFormat(chartResponse);
  }
};
