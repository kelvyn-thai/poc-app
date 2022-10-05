export type REC_TAB = {
  key: string;
  value: string;
};

export type RADIO_DROPDOWN_ITEM = {
  key: string;
  value: string;
};

export type VideoItem = {
  id: number; // unique id
  bytes: number[]; // video bytes array
  contentLength: number; // size of video
  start: number; // byte start
  end: number; // byte finish
  currentId: number; // start index from 1 (0 - original)
  original: VideoItem; // the original of video
  /**
   * // array contains all steps user action with video
   * Save as new -> get video item by currentId
   * User action -> push to edits new video item + update currentId
   * Undo -> currentId--
   * Redo -> currentId++
   */
  edits: VideoItem[];
};
