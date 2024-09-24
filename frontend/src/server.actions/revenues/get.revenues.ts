"use server";

import { authOptions } from "@/config/auth/auth.options";
import { getServerSession } from "next-auth";
import api from "@/config/api";
import { customFetch } from "../fetch";

export async function getRevenues(id_revenue?: string) {
  // const session = await getServerSession(authOptions);

  // if (!session) return null;

  let url = `${api.base_url}/revenue`;

  if (id_revenue) url = url + `/?id_revenue=${id_revenue}`;

  const revenues = await customFetch({
    url,
    method: "GET",
    isAuthenticated: true,
    cache: "no-cache",
    tags: ["revenues"],
    header: {
      "Content-Type": "application/json",
    },
  });

  // const req = await fetch(`${api.base_url}/revenue`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + session.user.access_token,
  //   },
  //   cache: "no-cache",
  //   next: {
  //     tags: ["revenues"],
  //   },
  // });

  // if (req.status != 200) return null;

  // const revenues = await req.json();

  return revenues;
}
