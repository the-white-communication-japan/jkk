import { redirect } from "next/navigation";

// /services 自体には独立したページを持たず、トップのサービス概要へ送る。
// 個別の事業領域は /services/[slug] を参照。
export default function ServicesIndex() {
  redirect("/#services");
}
