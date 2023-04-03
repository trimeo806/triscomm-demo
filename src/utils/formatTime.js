import { format, getTime, formatDistanceToNow } from "date-fns";

// Dung de format thoi gian khi su dung cac function duoi day
export function fDate(date) {
  return format(new Date(date), "dd MMMM yyyy");
}

export function fDateTime(date) {
  return format(new Date(date), "dd MMMM yyyy HH:mm");
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

//Cho khoang cach. Vd: co bai post duoc viet 7 ngay truoc thi no hien thi duoc la bai post nay duoc viet 7 ngay roi
export function fToNow(date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
