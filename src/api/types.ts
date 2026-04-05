export interface NotionConfig {
  apiKey: string;
}

export interface NotionError {
  status: number;
  code: string;
  message: string;
}

export interface NotionList<T> {
  object: 'list';
  results: T[];
  has_more: boolean;
  next_cursor: string | null;
}

export interface NotionPage {
  id: string;
  object: 'page';
  created_time: string;
  last_edited_time: string;
  archived: boolean;
  url: string;
  parent: { type: string; database_id?: string; page_id?: string; workspace?: boolean };
  properties: Record<string, any>;
  icon?: { type: string; emoji?: string; external?: { url: string } } | null;
}

export interface NotionDatabase {
  id: string;
  object: 'database';
  created_time: string;
  last_edited_time: string;
  title: Array<{ plain_text: string }>;
  description: Array<{ plain_text: string }>;
  url: string;
  properties: Record<string, any>;
  archived: boolean;
}

export interface NotionBlock {
  id: string;
  object: 'block';
  type: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  archived: boolean;
  [key: string]: any;
}

export interface NotionUser {
  id: string;
  object: 'user';
  type: string;
  name: string;
  avatar_url: string | null;
}

export interface NotionSearchResult {
  object: 'page' | 'database';
  id: string;
  url: string;
  title?: string;
  last_edited_time: string;
}

export interface RichText {
  type: 'text';
  text: { content: string; link?: { url: string } | null };
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
  };
}
