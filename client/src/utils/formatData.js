/**
 * hàm format tiền tệ Việt Nam
 * @param {*} money chuỗi tiền tệ cần format
 * @returns Chuỗi tiền tệ đã được format
 * Author: Thế Nam (11/9/2023)
 */
export const formatMoney = (money) => { 
      return money.toLocaleString("vi", { style: "currency", currency: "VND" });
};
export const formatDate = () => { };
export const formatEmail = () => { };