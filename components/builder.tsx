"use client";
import { ComponentProps, Suspense } from "react";
import { useIsPreviewing } from "@builder.io/react";
import { BuilderContent, builder } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "./error-boundary";
import "../builder-registry.tsx";

type BuilderPageProps = {
  content: BuilderContent | null;
  model: string;
};

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Use dynamic import for BuilderComponent to avoid SSR issues in Edge Runtime
const DynamicBuilderComponent = dynamic(() => import("@builder.io/react").then(mod => ({ default: mod.BuilderComponent })), {
  ssr: false,
  loading: () => <div>Loading Builder Component...</div>,
});

function BuilderComponentWrapper({ content, model }: BuilderPageProps) {
  // Call the useIsPreviewing hook to determine if
  // the page is being previewed in Builder
  const isPreviewing = useIsPreviewing();
  
  // If "content" has a value or the page is being previewed in Builder,
  // render the BuilderComponent with the specified content and model props.
  if (content || isPreviewing) {
    return <DynamicBuilderComponent content={content || undefined} model={model} />;
  }
  // If the "content" is falsy and the page is
  // not being previewed in Builder, render the
  // DefaultErrorPage with a 404.
  return <DefaultErrorPage statusCode={404} />;
}

export function RenderBuilderContent(props: BuilderPageProps) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <BuilderComponentWrapper {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
