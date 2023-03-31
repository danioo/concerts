"use client"

import { LoadingOverlay } from "@mantine/core";

export default function Loading() {
  return <LoadingOverlay loaderProps={{
    color: "teal"
  }} visible={true} />
}