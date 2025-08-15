"use client";
import { builder, Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

// Use dynamic imports for better Edge Runtime compatibility
const Counter = dynamic(() => import("./components/Counter/Counter"), {
  ssr: false,
  loading: () => <div>Loading Counter...</div>,
});

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(Counter, {
  name: "Counter",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});
