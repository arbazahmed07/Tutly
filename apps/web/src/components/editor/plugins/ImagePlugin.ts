import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "lexical";
import type { LexicalCommand } from "lexical";
import { useEffect } from "react";

import { $createImageNode, ImageNode } from "../nodes/ImageNode";
import type { ImagePayload } from "../nodes/ImageNode";

export type InsertImagePayload = Readonly<ImagePayload>;

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand("INSERT_IMAGE_COMMAND");

interface ImagesPluginProps {
  captionsEnabled?: boolean;
}

export default function ImagesPlugin({
  captionsEnabled,
}: ImagesPluginProps): React.ReactElement | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor");
    }

    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload: InsertImagePayload) => {
          const imageNode = $createImageNode({
            altText: payload.altText,
            src: payload.src,
            maxWidth: payload.maxWidth ?? 500,
            width: payload.width ?? "inherit",
            height: payload.height ?? "inherit",
            showCaption: payload.showCaption ?? false,
            captionsEnabled: payload.captionsEnabled ?? false,
          });
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    );
  }, [captionsEnabled, editor]);

  return null;
}
