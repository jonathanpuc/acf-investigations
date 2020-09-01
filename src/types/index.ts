export interface Reaction {
  type: string;
  user_id?: string;
  block_id?: number;
}

export interface Comment {
  text: string;
  user_uuid: string;
  timestamp: string;
  author: string;
}

export interface ContentSectionRow {
  heading: string;
  type: string;
  blocks: Array<any>;
  onReaction?: (reaction: any) => void;
}
