import numeral from "numeral";
//Xu ly format cua number nhap vao

//Su dung cai nay khi muon format so nhap vao thanh tien
export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? "$0,0" : "$0,0.00");
}

//Su dung cai nay khi muon format so nhap vao la phan tram
export function fPercent(number) {
  return numeral(number / 100).format("0.0%");
}

export function fNumber(number) {
  return numeral(number).format();
}

//Su dung cai nay khi muon format so nhap vao la 2 so thap phan sau dau phay
export function fShortenNumber(number) {
  return numeral(number).format("0.00a").replace(".00", "");
}

export function fData(number) {
  return numeral(number).format("0.0 b");
}
