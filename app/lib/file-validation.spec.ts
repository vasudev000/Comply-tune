import { describe, expect, it } from "vitest";

import { MAX_UPLOAD_FILE_SIZE, splitFilesBySize } from "./file-validation";

describe("splitFilesBySize", () => {
  it("accepts files up to and including 12 MB and rejects larger files", () => {
    const atLimit = {
      name: "limit.pdf",
      size: MAX_UPLOAD_FILE_SIZE,
    } as unknown as File;
    const overLimit = {
      name: "large.pdf",
      size: MAX_UPLOAD_FILE_SIZE + 1,
    } as unknown as File;

    expect(splitFilesBySize([atLimit, overLimit])).toEqual({
      accepted: [atLimit],
      rejected: [overLimit],
    });
  });
});
