import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  LocalDateTime: { input: any; output: any; }
};

export type Bookmark = {
  __typename?: 'Bookmark';
  bookmarkid: Scalars['Int']['output'];
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  post_bookmark?: Maybe<Post>;
  user_bookmark?: Maybe<User>;
};

export type BookmarkRequest = {
  createday?: InputMaybe<Scalars['LocalDateTime']['input']>;
  post_bookmarkid?: InputMaybe<Scalars['Int']['input']>;
  user_bookmarkid?: InputMaybe<Scalars['Int']['input']>;
};

export type Comment = {
  __typename?: 'Comment';
  comment_comment?: Maybe<Comment>;
  commentid: Scalars['Int']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isdelete?: Maybe<Scalars['Int']['output']>;
  post_comment?: Maybe<Post>;
  totaldislike?: Maybe<Scalars['Int']['output']>;
  totallike?: Maybe<Scalars['Int']['output']>;
  updateday?: Maybe<Scalars['LocalDateTime']['output']>;
  user_comment?: Maybe<User>;
  warning?: Maybe<Scalars['String']['output']>;
  warningword?: Maybe<Scalars['String']['output']>;
};

export type CommentRequest = {
  commentid?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  createday?: InputMaybe<Scalars['LocalDateTime']['input']>;
  isdelete?: InputMaybe<Scalars['Int']['input']>;
  post_commentid?: InputMaybe<Scalars['Int']['input']>;
  updateday?: InputMaybe<Scalars['LocalDateTime']['input']>;
  user_commentid?: InputMaybe<Scalars['Int']['input']>;
};

export type Comment_Like = {
  __typename?: 'Comment_Like';
  comment_commentlike?: Maybe<Comment>;
  commentlikeid: Scalars['Int']['output'];
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  icon_commentlike?: Maybe<Icon>;
  user_commentlike?: Maybe<User>;
};

export type Comment_LikeRequest = {
  comment_commentlikeid?: InputMaybe<Scalars['Int']['input']>;
  createday?: InputMaybe<Scalars['LocalDateTime']['input']>;
  icon_commentlikeid?: InputMaybe<Scalars['Int']['input']>;
  user_commentlikeid?: InputMaybe<Scalars['Int']['input']>;
};

export type ContentGroupMessage_Icon = {
  __typename?: 'ContentGroupMessage_Icon';
  content_groupmessage_iconid: Scalars['Int']['output'];
  content_iconcontentgroupmessage?: Maybe<Content_GroupMessage>;
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  icon_iconcontentgroupmessage?: Maybe<Icon>;
  user_iconcontentgroupmessage?: Maybe<User>;
};

export type ContentMessageDto = {
  __typename?: 'ContentMessageDTO';
  content?: Maybe<Scalars['String']['output']>;
  contentid?: Maybe<Scalars['Int']['output']>;
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  messageid?: Maybe<Scalars['Int']['output']>;
  parentid?: Maybe<Scalars['Int']['output']>;
  totalicon?: Maybe<Array<Maybe<TotalIcon>>>;
  updateday?: Maybe<Scalars['LocalDateTime']['output']>;
  userid?: Maybe<Scalars['String']['output']>;
};

export type Content_GroupMessage = {
  __typename?: 'Content_GroupMessage';
  content?: Maybe<Scalars['String']['output']>;
  contentMessageResponse?: Maybe<Content_GroupMessage>;
  content_groupmessageid: Scalars['Int']['output'];
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  groupmessage_content?: Maybe<DetailGroup_Message>;
  updateday?: Maybe<Scalars['LocalDateTime']['output']>;
  user_contentgroup?: Maybe<User>;
};

export type Content_Message = {
  __typename?: 'Content_Message';
  content?: Maybe<Scalars['String']['output']>;
  contentMessageResponse?: Maybe<Content_Message>;
  contentid: Scalars['Int']['output'];
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  icon_contentmessage?: Maybe<Icon>;
  message_content?: Maybe<Message>;
  updateday?: Maybe<Scalars['LocalDateTime']['output']>;
  user_content?: Maybe<User>;
};

export type DetailGroup_Message = {
  __typename?: 'DetailGroup_Message';
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  detailgroup_messageid: Scalars['Int']['output'];
  detailgroupmessage_groupmessage?: Maybe<Group_Message>;
  level?: Maybe<Scalars['Int']['output']>;
  user_detailgroupmessage?: Maybe<User>;
};

export type DetailMessage = {
  __typename?: 'DetailMessage';
  detailmessage_message?: Maybe<Message>;
  detailmessageid: Scalars['Int']['output'];
  isblock?: Maybe<Scalars['Int']['output']>;
  lastseen?: Maybe<Scalars['LocalDateTime']['output']>;
  user_detailmessage?: Maybe<User>;
};

export type DetailMessageDto = {
  __typename?: 'DetailMessageDTO';
  detailmessageid: Scalars['Int']['output'];
  isblock?: Maybe<Scalars['Int']['output']>;
  lastseen?: Maybe<Scalars['LocalDateTime']['output']>;
  lastsend?: Maybe<Scalars['LocalDateTime']['output']>;
  messageid?: Maybe<Scalars['Int']['output']>;
  userid?: Maybe<User>;
};

export type Follow = {
  __typename?: 'Follow';
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  followerid: Scalars['Int']['output'];
  user_follow?: Maybe<User>;
  user_follower?: Maybe<User>;
};

export type Group = {
  __typename?: 'Group';
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  groupid?: Maybe<Scalars['Int']['output']>;
  groupname?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  reputaion?: Maybe<Scalars['Int']['output']>;
  user_group?: Maybe<User>;
};

export type GroupDto = {
  __typename?: 'GroupDTO';
  admin?: Maybe<Scalars['String']['output']>;
  chanel?: Maybe<Scalars['Int']['output']>;
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  groupid?: Maybe<Scalars['Int']['output']>;
  groupname?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  reputation?: Maybe<Scalars['Int']['output']>;
  totaluser?: Maybe<Scalars['Int']['output']>;
};

export type GroupRequest = {
  description?: InputMaybe<Scalars['String']['input']>;
  groupid?: InputMaybe<Scalars['Int']['input']>;
  groupname?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  reputaion?: InputMaybe<Scalars['Int']['input']>;
};

export type Group_Message = {
  __typename?: 'Group_Message';
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  group_messagedescription?: Maybe<Scalars['String']['output']>;
  group_messageid: Scalars['Int']['output'];
  group_messageimage?: Maybe<Scalars['String']['output']>;
  group_messagename?: Maybe<Scalars['String']['output']>;
};

export type Group_MessageRequest = {
  createday?: InputMaybe<Scalars['LocalDateTime']['input']>;
  group_messagedescription?: InputMaybe<Scalars['String']['input']>;
  group_messageid?: InputMaybe<Scalars['Int']['input']>;
  group_messageimage?: InputMaybe<Scalars['String']['input']>;
  group_messagename?: InputMaybe<Scalars['String']['input']>;
};

export type Icon = {
  __typename?: 'Icon';
  iconid: Scalars['Int']['output'];
  iconimage?: Maybe<Scalars['String']['output']>;
  iconname?: Maybe<Scalars['String']['output']>;
};

export type IconRequest = {
  iconimage?: InputMaybe<Scalars['String']['input']>;
  iconname?: InputMaybe<Scalars['String']['input']>;
};

export type IsBan = {
  __typename?: 'IsBan';
  description?: Maybe<Scalars['String']['output']>;
  isbanid: Scalars['Int']['output'];
  nameban?: Maybe<Scalars['String']['output']>;
};

export type Message = {
  __typename?: 'Message';
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  messageid: Scalars['Int']['output'];
  messagename?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**     User */
  account_update?: Maybe<User>;
  add_icon_to_content_message?: Maybe<Scalars['String']['output']>;
  ban_user?: Maybe<User>;
  block_message?: Maybe<Scalars['String']['output']>;
  createIcon?: Maybe<Icon>;
  /**     Bookmark */
  create_bookmark?: Maybe<Bookmark>;
  create_comment?: Maybe<Comment>;
  create_comment_in_comment?: Maybe<Comment>;
  /**    Content_GroupMessage */
  create_content_groupmessage?: Maybe<Scalars['String']['output']>;
  /**    Content_GroupMessage_Icon */
  create_content_groupmessage_icon?: Maybe<Scalars['String']['output']>;
  /**     Content_Message */
  create_content_message?: Maybe<Scalars['String']['output']>;
  /**     Follow */
  create_follow?: Maybe<Scalars['String']['output']>;
  /**    Group */
  create_group?: Maybe<GroupDto>;
  /**    Group_Message */
  create_group_message?: Maybe<Scalars['String']['output']>;
  /**     CommentLike */
  create_icon_for_commentlike?: Maybe<Scalars['String']['output']>;
  /**     PostLike */
  create_icon_for_postlike?: Maybe<Scalars['String']['output']>;
  /**     Message */
  create_message?: Maybe<Message>;
  /**     Notice */
  create_notice?: Maybe<Notice>;
  create_post?: Maybe<Scalars['String']['output']>;
  create_post_in_group?: Maybe<Scalars['String']['output']>;
  create_report_comment?: Maybe<Scalars['String']['output']>;
  create_report_post?: Maybe<Scalars['String']['output']>;
  /**      Report */
  create_report_user?: Maybe<Scalars['String']['output']>;
  /**     Topic */
  create_topic?: Maybe<Scalars['String']['output']>;
  delete_bookmark?: Maybe<Scalars['String']['output']>;
  delete_comment_by_pk?: Maybe<Scalars['String']['output']>;
  delete_content_groupmessage?: Maybe<Scalars['String']['output']>;
  delete_content_message?: Maybe<Scalars['String']['output']>;
  delete_follow?: Maybe<Scalars['String']['output']>;
  delete_group?: Maybe<Scalars['String']['output']>;
  delete_group_message?: Maybe<Scalars['String']['output']>;
  delete_icon_for_commentlike?: Maybe<Scalars['String']['output']>;
  delete_icon_for_postlike?: Maybe<Scalars['String']['output']>;
  delete_notice?: Maybe<Scalars['String']['output']>;
  delete_post_by_pk?: Maybe<Scalars['String']['output']>;
  delete_report_by_commentid?: Maybe<Scalars['String']['output']>;
  delete_report_by_postid?: Maybe<Scalars['String']['output']>;
  delete_report_by_userid?: Maybe<Scalars['String']['output']>;
  delete_topic?: Maybe<Scalars['String']['output']>;
  hide_post?: Maybe<Scalars['String']['output']>;
  /**    User_Group */
  join_group?: Maybe<Scalars['String']['output']>;
  /**    DetailGroup_Message */
  join_group_message?: Maybe<Scalars['String']['output']>;
  leave_group?: Maybe<Scalars['String']['output']>;
  leave_group_message?: Maybe<Scalars['String']['output']>;
  logout?: Maybe<Scalars['String']['output']>;
  update_check?: Maybe<Scalars['String']['output']>;
  /**     Comment */
  update_comment_by_pk?: Maybe<Scalars['String']['output']>;
  update_content_groupmessage?: Maybe<Scalars['String']['output']>;
  update_content_message?: Maybe<Scalars['String']['output']>;
  update_group?: Maybe<Scalars['String']['output']>;
  update_group_message?: Maybe<Scalars['String']['output']>;
  update_isseen_false?: Maybe<Notice>;
  update_isseen_true?: Maybe<Notice>;
  /**     DetailMessage */
  update_lastseen?: Maybe<Scalars['String']['output']>;
  update_lastseen_group?: Maybe<Scalars['String']['output']>;
  update_level_detailgroup_message?: Maybe<Scalars['String']['output']>;
  /**     Post */
  update_post_by_pk?: Maybe<Scalars['String']['output']>;
  update_reputation?: Maybe<Scalars['String']['output']>;
  update_topic?: Maybe<Topic>;
  update_totalread_post?: Maybe<Scalars['String']['output']>;
};


export type MutationAccount_UpdateArgs = {
  user?: InputMaybe<UserRequest>;
};


export type MutationAdd_Icon_To_Content_MessageArgs = {
  contentid?: InputMaybe<Scalars['Int']['input']>;
  iconid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationBan_UserArgs = {
  isbanid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationBlock_MessageArgs = {
  isblock?: InputMaybe<Scalars['Int']['input']>;
  messageid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateIconArgs = {
  iconimage?: InputMaybe<Scalars['String']['input']>;
  iconname?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreate_BookmarkArgs = {
  postid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreate_CommentArgs = {
  comment?: InputMaybe<CommentRequest>;
  postid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreate_Comment_In_CommentArgs = {
  comment?: InputMaybe<CommentRequest>;
  comment_parentid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreate_Content_GroupmessageArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  groupmessageId?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  messageresponseid?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreate_Content_Groupmessage_IconArgs = {
  contentgroupmessageid?: InputMaybe<Scalars['Int']['input']>;
  iconid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreate_Content_MessageArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  messageid?: InputMaybe<Scalars['Int']['input']>;
  messageresponseid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreate_FollowArgs = {
  followerid?: InputMaybe<Scalars['String']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreate_GroupArgs = {
  admin?: InputMaybe<Scalars['String']['input']>;
  group?: InputMaybe<GroupRequest>;
};


export type MutationCreate_Group_MessageArgs = {
  group_message?: InputMaybe<Group_MessageRequest>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreate_Icon_For_CommentlikeArgs = {
  commentid?: InputMaybe<Scalars['Int']['input']>;
  iconid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreate_Icon_For_PostlikeArgs = {
  iconid?: InputMaybe<Scalars['Int']['input']>;
  postid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreate_MessageArgs = {
  userid1?: InputMaybe<Scalars['String']['input']>;
  userid2?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreate_NoticeArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreate_PostArgs = {
  post?: InputMaybe<PostRequest>;
  topic?: InputMaybe<Array<InputMaybe<TopicRequest>>>;
  user?: InputMaybe<UserRequest>;
};


export type MutationCreate_Post_In_GroupArgs = {
  groupid?: InputMaybe<Scalars['Int']['input']>;
  post?: InputMaybe<PostRequest>;
  topic?: InputMaybe<Array<InputMaybe<TopicRequest>>>;
  user?: InputMaybe<UserRequest>;
};


export type MutationCreate_Report_CommentArgs = {
  commentid?: InputMaybe<Scalars['Int']['input']>;
  report?: InputMaybe<ReportRequest>;
  reporterid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreate_Report_PostArgs = {
  postid?: InputMaybe<Scalars['Int']['input']>;
  report?: InputMaybe<ReportRequest>;
  reporterid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreate_Report_UserArgs = {
  report?: InputMaybe<ReportRequest>;
  reporterid?: InputMaybe<Scalars['String']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreate_TopicArgs = {
  topicname?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDelete_BookmarkArgs = {
  postid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDelete_Comment_By_PkArgs = {
  commentid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDelete_Content_GroupmessageArgs = {
  contentId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDelete_Content_MessageArgs = {
  contentid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDelete_FollowArgs = {
  followerid?: InputMaybe<Scalars['String']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDelete_GroupArgs = {
  groupid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDelete_Group_MessageArgs = {
  group_messageid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDelete_Icon_For_CommentlikeArgs = {
  commentid?: InputMaybe<Scalars['Int']['input']>;
  iconid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDelete_Icon_For_PostlikeArgs = {
  iconid?: InputMaybe<Scalars['Int']['input']>;
  postid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDelete_NoticeArgs = {
  noticeid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDelete_Post_By_PkArgs = {
  postid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDelete_Report_By_CommentidArgs = {
  commentid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDelete_Report_By_PostidArgs = {
  postid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDelete_Report_By_UseridArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDelete_TopicArgs = {
  topicid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationHide_PostArgs = {
  postid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationJoin_GroupArgs = {
  groupid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationJoin_Group_MessageArgs = {
  groupmessageid?: InputMaybe<Scalars['Int']['input']>;
  level?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLeave_GroupArgs = {
  groupid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLeave_Group_MessageArgs = {
  groupmessageid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLogoutArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdate_CheckArgs = {
  check?: InputMaybe<Scalars['Int']['input']>;
  groupid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdate_Comment_By_PkArgs = {
  comment?: InputMaybe<CommentRequest>;
};


export type MutationUpdate_Content_GroupmessageArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  contentId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdate_Content_MessageArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  contentid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdate_GroupArgs = {
  group?: InputMaybe<GroupRequest>;
};


export type MutationUpdate_Group_MessageArgs = {
  group_message?: InputMaybe<Group_MessageRequest>;
};


export type MutationUpdate_Isseen_FalseArgs = {
  noticeid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdate_Isseen_TrueArgs = {
  noticeid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdate_LastseenArgs = {
  messageid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdate_Lastseen_GroupArgs = {
  groupmessageid?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdate_Level_Detailgroup_MessageArgs = {
  groupmessageid?: InputMaybe<Scalars['Int']['input']>;
  level?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdate_Post_By_PkArgs = {
  post?: InputMaybe<PostRequest>;
  topic?: InputMaybe<Array<InputMaybe<TopicRequest>>>;
};


export type MutationUpdate_ReputationArgs = {
  reputation?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdate_TopicArgs = {
  topic?: InputMaybe<TopicRequest>;
};


export type MutationUpdate_Totalread_PostArgs = {
  postid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};

export type Notice = {
  __typename?: 'Notice';
  content?: Maybe<Scalars['String']['output']>;
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  isseen?: Maybe<Scalars['Int']['output']>;
  noiticeid: Scalars['Int']['output'];
  subjectid?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['Int']['output']>;
  user_notice?: Maybe<User>;
};

export type NoticeRequest = {
  content?: InputMaybe<Scalars['String']['input']>;
  createday?: InputMaybe<Scalars['LocalDateTime']['input']>;
  noticeid?: InputMaybe<Scalars['Int']['input']>;
  subjectid?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['Int']['input']>;
  user_notice?: InputMaybe<Scalars['Int']['input']>;
};

export type Post = {
  __typename?: 'Post';
  content?: Maybe<Scalars['String']['output']>;
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  group_post?: Maybe<Group>;
  image?: Maybe<Scalars['String']['output']>;
  isdelete?: Maybe<Scalars['Int']['output']>;
  ishide?: Maybe<Scalars['Int']['output']>;
  postid: Scalars['Int']['output'];
  requiredreputation?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  totalread?: Maybe<Scalars['Int']['output']>;
  updateday?: Maybe<Scalars['LocalDateTime']['output']>;
  user_post?: Maybe<User>;
  warning?: Maybe<Scalars['String']['output']>;
  warningword?: Maybe<Scalars['String']['output']>;
};

export type PostDto = {
  __typename?: 'PostDto';
  content?: Maybe<Scalars['String']['output']>;
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  group_post?: Maybe<Group>;
  image?: Maybe<Scalars['String']['output']>;
  ishide?: Maybe<Scalars['Int']['output']>;
  listtopic?: Maybe<Array<Maybe<Post_Topic>>>;
  postid: Scalars['Int']['output'];
  requiredreputation?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  totalcomment?: Maybe<Scalars['Int']['output']>;
  totaldislike?: Maybe<Scalars['Int']['output']>;
  totallike?: Maybe<Scalars['Int']['output']>;
  totalread?: Maybe<Scalars['Int']['output']>;
  updateday?: Maybe<Scalars['LocalDateTime']['output']>;
  user_post?: Maybe<User>;
  warning?: Maybe<Scalars['String']['output']>;
  warningword?: Maybe<Scalars['String']['output']>;
};

export type PostRequest = {
  content?: InputMaybe<Scalars['String']['input']>;
  createday?: InputMaybe<Scalars['LocalDateTime']['input']>;
  group_post?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isdelete?: InputMaybe<Scalars['Int']['input']>;
  ishide?: InputMaybe<Scalars['Int']['input']>;
  postid?: InputMaybe<Scalars['Int']['input']>;
  requiredreputation?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  totalread?: InputMaybe<Scalars['Int']['input']>;
  updateday?: InputMaybe<Scalars['LocalDateTime']['input']>;
  user_post?: InputMaybe<Scalars['String']['input']>;
};

export type Post_Like = {
  __typename?: 'Post_Like';
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  icon_postlike?: Maybe<Icon>;
  post_postlike?: Maybe<Post>;
  postlikeid: Scalars['Int']['output'];
  user_postlike?: Maybe<User>;
};

export type Post_LikeRequest = {
  createday?: InputMaybe<Scalars['LocalDateTime']['input']>;
  icon_postlikeid?: InputMaybe<Scalars['Int']['input']>;
  post_postlikeid?: InputMaybe<Scalars['Int']['input']>;
  user_postlikeid?: InputMaybe<Scalars['Int']['input']>;
};

export type Post_Topic = {
  __typename?: 'Post_Topic';
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  post_posttopic?: Maybe<Post>;
  posttopicid: Scalars['Int']['output'];
  topic_posttopic?: Maybe<Topic>;
};

export type Query = {
  __typename?: 'Query';
  /**     User */
  account?: Maybe<Array<Maybe<User>>>;
  check_comment_in_comment?: Maybe<Scalars['Int']['output']>;
  /**    DetailMessage */
  check_detail_message?: Maybe<Scalars['Boolean']['output']>;
  /**     Comment */
  comment?: Maybe<Array<Maybe<Comment>>>;
  find_account_by_id?: Maybe<User>;
  /**     Bookmark */
  find_all_bookmark_by_userid?: Maybe<Array<Maybe<Bookmark>>>;
  find_all_comment_by_commentparentid?: Maybe<Array<Maybe<Comment>>>;
  find_all_comment_by_postid?: Maybe<Array<Maybe<Comment>>>;
  find_all_dislikecomment_by_commentid?: Maybe<Scalars['Int']['output']>;
  find_all_dislikepost_by_postid?: Maybe<Scalars['Int']['output']>;
  find_all_likecomment_by_commentid?: Maybe<Scalars['Int']['output']>;
  /** Post_Like */
  find_all_likepost_by_postid?: Maybe<Scalars['Int']['output']>;
  /**     Notice */
  find_all_notice_by_userid?: Maybe<Array<Maybe<Notice>>>;
  find_commentlike_by_commentid_and_userid?: Maybe<Comment_Like>;
  find_commentlike_byuserid?: Maybe<Array<Maybe<Comment_Like>>>;
  /**    Group */
  find_group_by_keyword?: Maybe<Array<Maybe<Group>>>;
  find_notice_by_userid_type_subject?: Maybe<Notice>;
  find_post_by_follow?: Maybe<Array<Maybe<PostDto>>>;
  find_post_by_id?: Maybe<PostDto>;
  find_post_by_keyword?: Maybe<Array<Maybe<PostDto>>>;
  find_post_by_listtopicid?: Maybe<Array<Maybe<PostDto>>>;
  find_post_by_topicid?: Maybe<Array<Maybe<PostDto>>>;
  find_post_by_userid?: Maybe<Array<Maybe<PostDto>>>;
  find_post_in_group?: Maybe<Array<Maybe<PostDto>>>;
  find_postlike_by_postid_and_userid?: Maybe<Post_Like>;
  find_postlike_byuserid?: Maybe<Array<Maybe<Post_Like>>>;
  find_topic_by_topicname?: Maybe<Array<Maybe<Topic>>>;
  /**    Follow */
  get_all_follower_by_user?: Maybe<Array<Maybe<User>>>;
  get_all_group?: Maybe<Array<Maybe<Group>>>;
  get_all_user_by_follower?: Maybe<Array<Maybe<User>>>;
  /**    Content_GroupMessage */
  get_content_groupmessage_by_groupmessageid?: Maybe<Array<Maybe<Content_GroupMessage>>>;
  /**    Content_Message */
  get_content_message_by_messageid?: Maybe<Array<Maybe<Content_Message>>>;
  get_detail_message_by_userid?: Maybe<Array<Maybe<DetailMessage>>>;
  /**    DetailGroup_Message */
  get_detailgroup_message_by_userid?: Maybe<Array<Maybe<DetailGroup_Message>>>;
  get_group_by_admin?: Maybe<Array<Maybe<Group>>>;
  get_group_by_groupid?: Maybe<Group>;
  get_group_by_userid?: Maybe<Array<Maybe<Group>>>;
  /**    Group_Message */
  get_group_message_by_keyword?: Maybe<Array<Maybe<Group_Message>>>;
  get_list_ban_user?: Maybe<Array<Maybe<User>>>;
  get_list_low_reputation?: Maybe<Array<Maybe<User>>>;
  /**     Report */
  get_report_by_type?: Maybe<Array<Maybe<Report>>>;
  get_top_reputation_user?: Maybe<Array<Maybe<User>>>;
  get_user_by_keyword?: Maybe<Array<Maybe<User>>>;
  /**    User_Group */
  get_user_in_group?: Maybe<Array<Maybe<User_Group>>>;
  iconList?: Maybe<Array<Maybe<Icon>>>;
  list_commentdislike_by_commentid?: Maybe<Array<Maybe<Comment_Like>>>;
  /**     Comment_Like */
  list_commentlike_by_commentid?: Maybe<Array<Maybe<Comment_Like>>>;
  /**     Post */
  post?: Maybe<Array<Maybe<PostDto>>>;
  post_for_user?: Maybe<Array<Maybe<PostDto>>>;
  statistic_post?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  statistic_post_in_topic?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  /**    Statistic */
  statistic_user?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  /**     Topic */
  topic?: Maybe<Array<Maybe<Topic>>>;
};


export type QueryAccountArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  pacing?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCheck_Comment_In_CommentArgs = {
  commentid?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCheck_Detail_MessageArgs = {
  userid1?: InputMaybe<Scalars['String']['input']>;
  userid2?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCommentArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  pacing?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFind_Account_By_IdArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFind_All_Bookmark_By_UseridArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFind_All_Comment_By_CommentparentidArgs = {
  commentparentid?: InputMaybe<Scalars['Int']['input']>;
  postid?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFind_All_Comment_By_PostidArgs = {
  postid?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFind_All_Dislikecomment_By_CommentidArgs = {
  commentid?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFind_All_Dislikepost_By_PostidArgs = {
  postid?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFind_All_Likecomment_By_CommentidArgs = {
  commentid?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFind_All_Likepost_By_PostidArgs = {
  postid?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFind_All_Notice_By_UseridArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFind_Commentlike_By_Commentid_And_UseridArgs = {
  commentid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFind_Commentlike_ByuseridArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFind_Group_By_KeywordArgs = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFind_Notice_By_Userid_Type_SubjectArgs = {
  subject?: InputMaybe<Scalars['Int']['input']>;
  typee?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFind_Post_By_FollowArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFind_Post_By_IdArgs = {
  postid?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFind_Post_By_KeywordArgs = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFind_Post_By_ListtopicidArgs = {
  topicids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};


export type QueryFind_Post_By_TopicidArgs = {
  topicid?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFind_Post_By_UseridArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFind_Post_In_GroupArgs = {
  groupid?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFind_Postlike_By_Postid_And_UseridArgs = {
  postid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFind_Postlike_ByuseridArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFind_Topic_By_TopicnameArgs = {
  topicname?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGet_All_Follower_By_UserArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGet_All_GroupArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  pacing?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGet_All_User_By_FollowerArgs = {
  followerid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGet_Content_Groupmessage_By_GroupmessageidArgs = {
  groupmessageId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGet_Content_Message_By_MessageidArgs = {
  messageid?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGet_Detail_Message_By_UseridArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGet_Detailgroup_Message_By_UseridArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGet_Group_By_AdminArgs = {
  admin?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGet_Group_By_GroupidArgs = {
  groupid?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGet_Group_By_UseridArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGet_Group_Message_By_KeywordArgs = {
  keyword?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGet_Report_By_TypeArgs = {
  type?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGet_User_By_KeywordArgs = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGet_User_In_GroupArgs = {
  groupid?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  pacing?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryList_Commentdislike_By_CommentidArgs = {
  commentid?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryList_Commentlike_By_CommentidArgs = {
  commentid?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  pacing?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPost_For_UserArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  pacing?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type QueryStatistic_PostArgs = {
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryStatistic_UserArgs = {
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type Report = {
  __typename?: 'Report';
  comment_report?: Maybe<Comment>;
  content?: Maybe<Scalars['String']['output']>;
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  post_report?: Maybe<Post>;
  reason?: Maybe<Scalars['String']['output']>;
  reportid: Scalars['Int']['output'];
  type?: Maybe<Scalars['Int']['output']>;
  user_report?: Maybe<User>;
  user_reporter?: Maybe<User>;
};

export type ReportRequest = {
  comment_report?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  createday?: InputMaybe<Scalars['LocalDateTime']['input']>;
  post_report?: InputMaybe<Scalars['Int']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['Int']['input']>;
  user_report?: InputMaybe<Scalars['String']['input']>;
  user_reporter?: InputMaybe<Scalars['String']['input']>;
};

export type Role = {
  __typename?: 'Role';
  path?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  roleid: Scalars['Int']['output'];
  rolename?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  sub_all_notice_by_userid?: Maybe<Array<Maybe<Notice>>>;
  sub_content_message_by_messageid?: Maybe<Array<Maybe<ContentMessageDto>>>;
  sub_contentgroup_message_by_userid?: Maybe<Array<Maybe<ContentMessageDto>>>;
  sub_detail_message_by_userid?: Maybe<Array<Maybe<DetailMessageDto>>>;
  sub_group_message_by_userid?: Maybe<Array<Maybe<Group_Message>>>;
  sub_status_user?: Maybe<User>;
};


export type SubscriptionSub_All_Notice_By_UseridArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionSub_Content_Message_By_MessageidArgs = {
  messageid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionSub_Contentgroup_Message_By_UseridArgs = {
  groupmessageId?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionSub_Detail_Message_By_UseridArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionSub_Group_Message_By_UseridArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionSub_Status_UserArgs = {
  userid?: InputMaybe<Scalars['String']['input']>;
};

export type Topic = {
  __typename?: 'Topic';
  color?: Maybe<Scalars['String']['output']>;
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isdelete?: Maybe<Scalars['Int']['output']>;
  ishide?: Maybe<Scalars['Int']['output']>;
  topicid: Scalars['Int']['output'];
  topicname?: Maybe<Scalars['String']['output']>;
};

export type TopicRequest = {
  color?: InputMaybe<Scalars['String']['input']>;
  createday?: InputMaybe<Scalars['LocalDateTime']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isdelete?: InputMaybe<Scalars['Int']['input']>;
  ishide?: InputMaybe<Scalars['Int']['input']>;
  topicid?: InputMaybe<Scalars['Int']['input']>;
  topicname?: InputMaybe<Scalars['String']['input']>;
  user_topicid?: InputMaybe<Scalars['Int']['input']>;
};

export type TotalIcon = {
  __typename?: 'TotalIcon';
  iconid?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['Date']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isban?: Maybe<IsBan>;
  mssv?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  reputation?: Maybe<Scalars['Int']['output']>;
  role?: Maybe<Role>;
  status?: Maybe<Scalars['Int']['output']>;
  totalfollowing?: Maybe<Scalars['Int']['output']>;
  userid: Scalars['String']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type UserRequest = {
  address?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['Date']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  createday?: InputMaybe<Scalars['LocalDateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isbanid?: InputMaybe<Scalars['Int']['input']>;
  mssv?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  reputation?: InputMaybe<Scalars['Int']['input']>;
  roleid?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  totalfollowing?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User_Group = {
  __typename?: 'User_Group';
  checked?: Maybe<Scalars['Int']['output']>;
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  group_usergroup?: Maybe<Group>;
  user_groupid?: Maybe<Scalars['Int']['output']>;
  user_usergroup?: Maybe<User>;
};

export type ViewPost = {
  __typename?: 'ViewPost';
  createday?: Maybe<Scalars['LocalDateTime']['output']>;
  post_view?: Maybe<Post>;
  user_view?: Maybe<User>;
  viewid: Scalars['Int']['output'];
};

export type UserFragment = { __typename?: 'User', userid: string, username?: string | null, fullname?: string | null, email?: string | null, address?: string | null, phone?: string | null, birthday?: any | null, gender?: string | null, image?: string | null, createday?: any | null, reputation?: number | null, status?: number | null, mssv?: string | null, bio?: string | null, color?: string | null, totalfollowing?: number | null, role?: { __typename?: 'Role', roleid: number, rolename?: string | null } | null, isban?: { __typename?: 'IsBan', isbanid: number, nameban?: string | null, description?: string | null } | null };

export type GetAccountQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  pacing?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAccountQuery = { __typename?: 'Query', account?: Array<{ __typename?: 'User', userid: string, username?: string | null, fullname?: string | null, email?: string | null, address?: string | null, phone?: string | null, birthday?: any | null, gender?: string | null, image?: string | null, createday?: any | null, reputation?: number | null, status?: number | null, mssv?: string | null, bio?: string | null, color?: string | null, totalfollowing?: number | null, role?: { __typename?: 'Role', roleid: number, rolename?: string | null } | null, isban?: { __typename?: 'IsBan', isbanid: number, nameban?: string | null, description?: string | null } | null } | null> | null };

export type GetAccountByPkQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetAccountByPkQuery = { __typename?: 'Query', find_account_by_id?: { __typename?: 'User', userid: string, username?: string | null, fullname?: string | null, email?: string | null, address?: string | null, phone?: string | null, birthday?: any | null, gender?: string | null, image?: string | null, createday?: any | null, reputation?: number | null, status?: number | null, mssv?: string | null, bio?: string | null, color?: string | null, totalfollowing?: number | null, role?: { __typename?: 'Role', roleid: number, rolename?: string | null } | null, isban?: { __typename?: 'IsBan', isbanid: number, nameban?: string | null, description?: string | null } | null } | null };

export type GetUserGroupQueryVariables = Exact<{
  groupid?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  pacing?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUserGroupQuery = { __typename?: 'Query', get_user_in_group?: Array<{ __typename?: 'User_Group', user_groupid?: number | null, createday?: any | null, checked?: number | null, user_usergroup?: { __typename?: 'User', userid: string, username?: string | null, fullname?: string | null, email?: string | null, address?: string | null, phone?: string | null, birthday?: any | null, gender?: string | null, image?: string | null, createday?: any | null, reputation?: number | null, status?: number | null, mssv?: string | null, bio?: string | null, color?: string | null, totalfollowing?: number | null, role?: { __typename?: 'Role', roleid: number, rolename?: string | null } | null, isban?: { __typename?: 'IsBan', isbanid: number, nameban?: string | null, description?: string | null } | null } | null, group_usergroup?: { __typename?: 'Group', groupid?: number | null, groupname?: string | null } | null } | null> | null };

export type GetFollowerUserQueryVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetFollowerUserQuery = { __typename?: 'Query', get_all_follower_by_user?: Array<{ __typename?: 'User', userid: string, username?: string | null, fullname?: string | null, email?: string | null, address?: string | null, phone?: string | null, birthday?: any | null, gender?: string | null, image?: string | null, createday?: any | null, reputation?: number | null, status?: number | null, mssv?: string | null, bio?: string | null, color?: string | null, totalfollowing?: number | null, role?: { __typename?: 'Role', roleid: number, rolename?: string | null } | null, isban?: { __typename?: 'IsBan', isbanid: number, nameban?: string | null, description?: string | null } | null } | null> | null };

export type GetFollowingUserQueryVariables = Exact<{
  followerid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetFollowingUserQuery = { __typename?: 'Query', get_all_user_by_follower?: Array<{ __typename?: 'User', userid: string, username?: string | null, fullname?: string | null, email?: string | null, address?: string | null, phone?: string | null, birthday?: any | null, gender?: string | null, image?: string | null, createday?: any | null, reputation?: number | null, status?: number | null, mssv?: string | null, bio?: string | null, color?: string | null, totalfollowing?: number | null, role?: { __typename?: 'Role', roleid: number, rolename?: string | null } | null, isban?: { __typename?: 'IsBan', isbanid: number, nameban?: string | null, description?: string | null } | null } | null> | null };

export type GetTopHightReputationUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopHightReputationUserQuery = { __typename?: 'Query', get_top_reputation_user?: Array<{ __typename?: 'User', userid: string, username?: string | null, fullname?: string | null, email?: string | null, address?: string | null, phone?: string | null, birthday?: any | null, gender?: string | null, image?: string | null, createday?: any | null, reputation?: number | null, status?: number | null, mssv?: string | null, bio?: string | null, color?: string | null, totalfollowing?: number | null, role?: { __typename?: 'Role', roleid: number, rolename?: string | null } | null, isban?: { __typename?: 'IsBan', isbanid: number, nameban?: string | null, description?: string | null } | null } | null> | null };

export type GetTopLowReputationUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopLowReputationUserQuery = { __typename?: 'Query', get_list_low_reputation?: Array<{ __typename?: 'User', userid: string, username?: string | null, fullname?: string | null, email?: string | null, address?: string | null, phone?: string | null, birthday?: any | null, gender?: string | null, image?: string | null, createday?: any | null, reputation?: number | null, status?: number | null, mssv?: string | null, bio?: string | null, color?: string | null, totalfollowing?: number | null, role?: { __typename?: 'Role', roleid: number, rolename?: string | null } | null, isban?: { __typename?: 'IsBan', isbanid: number, nameban?: string | null, description?: string | null } | null } | null> | null };

export type GetListBanUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListBanUserQuery = { __typename?: 'Query', get_list_ban_user?: Array<{ __typename?: 'User', userid: string, username?: string | null, fullname?: string | null, email?: string | null, address?: string | null, phone?: string | null, birthday?: any | null, gender?: string | null, image?: string | null, createday?: any | null, reputation?: number | null, status?: number | null, mssv?: string | null, bio?: string | null, color?: string | null, totalfollowing?: number | null, role?: { __typename?: 'Role', roleid: number, rolename?: string | null } | null, isban?: { __typename?: 'IsBan', isbanid: number, nameban?: string | null, description?: string | null } | null } | null> | null };

export type GetUserByKeywordQueryVariables = Exact<{
  keyword?: InputMaybe<Scalars['String']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserByKeywordQuery = { __typename?: 'Query', get_user_by_keyword?: Array<{ __typename?: 'User', userid: string, username?: string | null, fullname?: string | null, email?: string | null, address?: string | null, phone?: string | null, birthday?: any | null, gender?: string | null, image?: string | null, createday?: any | null, reputation?: number | null, status?: number | null, mssv?: string | null, bio?: string | null, color?: string | null, totalfollowing?: number | null, role?: { __typename?: 'Role', roleid: number, rolename?: string | null } | null, isban?: { __typename?: 'IsBan', isbanid: number, nameban?: string | null, description?: string | null } | null } | null> | null };

export type UpdateUserInfoMutationVariables = Exact<{
  user?: InputMaybe<UserRequest>;
}>;


export type UpdateUserInfoMutation = { __typename?: 'Mutation', account_update?: { __typename?: 'User', userid: string } | null };

export type CreateFollowMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
  followerid?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateFollowMutation = { __typename?: 'Mutation', create_follow?: string | null };

export type DeleteFollowMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
  followerid?: InputMaybe<Scalars['String']['input']>;
}>;


export type DeleteFollowMutation = { __typename?: 'Mutation', delete_follow?: string | null };

export type BanUserMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
  isbanid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type BanUserMutation = { __typename?: 'Mutation', ban_user?: { __typename?: 'User', userid: string, username?: string | null, fullname?: string | null, email?: string | null, address?: string | null, phone?: string | null, birthday?: any | null, gender?: string | null, image?: string | null, createday?: any | null, reputation?: number | null, status?: number | null, mssv?: string | null, bio?: string | null, color?: string | null, totalfollowing?: number | null, role?: { __typename?: 'Role', roleid: number, rolename?: string | null } | null, isban?: { __typename?: 'IsBan', isbanid: number, nameban?: string | null, description?: string | null } | null } | null };

export type UpdateReputationMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
  reputation?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateReputationMutation = { __typename?: 'Mutation', update_reputation?: string | null };

export type CommentFragment = { __typename?: 'Comment', commentid: number, content?: string | null, createday?: any | null, updateday?: any | null, isdelete?: number | null, user_comment?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, post_comment?: { __typename?: 'Post', postid: number } | null };

export type CmtFragment = { __typename?: 'Comment', commentid: number, content?: string | null, createday?: any | null, updateday?: any | null, isdelete?: number | null, comment_comment?: { __typename?: 'Comment', commentid: number, content?: string | null, createday?: any | null, updateday?: any | null, isdelete?: number | null, user_comment?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, post_comment?: { __typename?: 'Post', postid: number } | null } | null, user_comment?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, post_comment?: { __typename?: 'Post', postid: number } | null };

export type GetCommentByPostIdQueryVariables = Exact<{
  postid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCommentByPostIdQuery = { __typename?: 'Query', find_all_comment_by_postid?: Array<{ __typename?: 'Comment', commentid: number, content?: string | null, createday?: any | null, updateday?: any | null, isdelete?: number | null, comment_comment?: { __typename?: 'Comment', commentid: number, content?: string | null, createday?: any | null, updateday?: any | null, isdelete?: number | null, user_comment?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, post_comment?: { __typename?: 'Post', postid: number } | null } | null, user_comment?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, post_comment?: { __typename?: 'Post', postid: number } | null } | null> | null };

export type CreateCommentMutationVariables = Exact<{
  comment?: InputMaybe<CommentRequest>;
  userid?: InputMaybe<Scalars['String']['input']>;
  postid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', create_comment?: { __typename?: 'Comment', commentid: number, content?: string | null, createday?: any | null, updateday?: any | null, isdelete?: number | null, comment_comment?: { __typename?: 'Comment', commentid: number, content?: string | null, createday?: any | null, updateday?: any | null, isdelete?: number | null, user_comment?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, post_comment?: { __typename?: 'Post', postid: number } | null } | null, user_comment?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, post_comment?: { __typename?: 'Post', postid: number } | null } | null };

export type CreateCommentChildMutationVariables = Exact<{
  comment?: InputMaybe<CommentRequest>;
  userid?: InputMaybe<Scalars['String']['input']>;
  comment_parentid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateCommentChildMutation = { __typename?: 'Mutation', create_comment_in_comment?: { __typename?: 'Comment', commentid: number, content?: string | null, createday?: any | null, updateday?: any | null, isdelete?: number | null, comment_comment?: { __typename?: 'Comment', commentid: number, content?: string | null, createday?: any | null, updateday?: any | null, isdelete?: number | null, user_comment?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, post_comment?: { __typename?: 'Post', postid: number } | null } | null, user_comment?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, post_comment?: { __typename?: 'Post', postid: number } | null } | null };

export type GroupFragment = { __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null, createday?: any | null, reputaion?: number | null, description?: string | null, user_group?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null };

export type GroupDtoFragment = { __typename?: 'GroupDTO', groupid?: number | null, groupname?: string | null, image?: string | null, createday?: any | null, reputation?: number | null, admin?: string | null, description?: string | null, chanel?: number | null, totaluser?: number | null };

export type GetAllGroupQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  pacing?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllGroupQuery = { __typename?: 'Query', get_all_group?: Array<{ __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null, createday?: any | null, reputaion?: number | null, description?: string | null, user_group?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null } | null> | null };

export type GetGroupByKeywordQueryVariables = Exact<{
  keyword?: InputMaybe<Scalars['String']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetGroupByKeywordQuery = { __typename?: 'Query', find_group_by_keyword?: Array<{ __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null, createday?: any | null, reputaion?: number | null, description?: string | null, user_group?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null } | null> | null };

export type GetGroupByAdminQueryVariables = Exact<{
  admin?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetGroupByAdminQuery = { __typename?: 'Query', get_group_by_admin?: Array<{ __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null, createday?: any | null, reputaion?: number | null, description?: string | null, user_group?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null } | null> | null };

export type GetGroupByUserIdQueryVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetGroupByUserIdQuery = { __typename?: 'Query', get_group_by_userid?: Array<{ __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null, createday?: any | null, reputaion?: number | null, description?: string | null, user_group?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null } | null> | null };

export type GetGroupByGroupIdQueryVariables = Exact<{
  groupid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetGroupByGroupIdQuery = { __typename?: 'Query', get_group_by_groupid?: { __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null, createday?: any | null, reputaion?: number | null, description?: string | null, user_group?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null } | null };

export type CreateGroupMutationVariables = Exact<{
  group?: InputMaybe<GroupRequest>;
  admin?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', create_group?: { __typename?: 'GroupDTO', groupid?: number | null, groupname?: string | null, image?: string | null, createday?: any | null, reputation?: number | null, admin?: string | null, description?: string | null, chanel?: number | null, totaluser?: number | null } | null };

export type UpdateGroupMutationVariables = Exact<{
  group?: InputMaybe<GroupRequest>;
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', update_group?: string | null };

export type DeleteGroupMutationVariables = Exact<{
  groupid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', delete_group?: string | null };

export type JoinGroupMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
  groupid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type JoinGroupMutation = { __typename?: 'Mutation', join_group?: string | null };

export type LeaveGroupMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
  groupid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type LeaveGroupMutation = { __typename?: 'Mutation', leave_group?: string | null };

export type AcceptUserToGroupMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
  groupid?: InputMaybe<Scalars['Int']['input']>;
  check?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AcceptUserToGroupMutation = { __typename?: 'Mutation', update_check?: string | null };

export type MessageFragment = { __typename?: 'DetailMessageDTO', detailmessageid: number, messageid?: number | null, isblock?: number | null, lastseen?: any | null, lastsend?: any | null, userid?: { __typename?: 'User', userid: string, fullname?: string | null, status?: number | null } | null };

export type ContentFragment = { __typename?: 'ContentMessageDTO', contentid?: number | null, content?: string | null, createday?: any | null, updateday?: any | null, parentid?: number | null, userid?: string | null, messageid?: number | null, image?: string | null, totalicon?: Array<{ __typename?: 'TotalIcon', iconid?: number | null, total?: number | null } | null> | null };

export type CreateMessageMutationVariables = Exact<{
  userid1?: InputMaybe<Scalars['String']['input']>;
  userid2?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', create_message?: { __typename?: 'Message', messageid: number, messagename?: string | null, createday?: any | null } | null };

export type CreateContentMessageMutationVariables = Exact<{
  content?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  messageid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
  messageresponseid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateContentMessageMutation = { __typename?: 'Mutation', create_content_message?: string | null };

export type GetMessageByUserIdSubscriptionVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMessageByUserIdSubscription = { __typename?: 'Subscription', sub_detail_message_by_userid?: Array<{ __typename?: 'DetailMessageDTO', detailmessageid: number, messageid?: number | null, isblock?: number | null, lastseen?: any | null, lastsend?: any | null, userid?: { __typename?: 'User', userid: string, fullname?: string | null, status?: number | null } | null } | null> | null };

export type GetDetailMessageByMessageIdSubscriptionVariables = Exact<{
  messageid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDetailMessageByMessageIdSubscription = { __typename?: 'Subscription', sub_content_message_by_messageid?: Array<{ __typename?: 'ContentMessageDTO', contentid?: number | null, content?: string | null, createday?: any | null, updateday?: any | null, parentid?: number | null, userid?: string | null, messageid?: number | null, image?: string | null, totalicon?: Array<{ __typename?: 'TotalIcon', iconid?: number | null, total?: number | null } | null> | null } | null> | null };

export type NoticeFragment = { __typename?: 'Notice', noiticeid: number, content?: string | null, createday?: any | null, isseen?: number | null, type?: number | null, subjectid?: number | null, user_notice?: { __typename?: 'User', userid: string, fullname?: string | null } | null };

export type GetNotificationByUserIdSubscriptionVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetNotificationByUserIdSubscription = { __typename?: 'Subscription', sub_all_notice_by_userid?: Array<{ __typename?: 'Notice', noiticeid: number, content?: string | null, createday?: any | null, isseen?: number | null, type?: number | null, subjectid?: number | null, user_notice?: { __typename?: 'User', userid: string, fullname?: string | null } | null } | null> | null };

export type IsSeenMutationVariables = Exact<{
  noticeid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type IsSeenMutation = { __typename?: 'Mutation', update_isseen_true?: { __typename?: 'Notice', noiticeid: number, content?: string | null, createday?: any | null, isseen?: number | null, type?: number | null, subjectid?: number | null, user_notice?: { __typename?: 'User', userid: string, fullname?: string | null } | null } | null };

export type PostFragment = { __typename?: 'Post', postid: number, content?: string | null, title?: string | null, createday?: any | null, updateday?: any | null, image?: string | null, ishide?: number | null, isdelete?: number | null, requiredreputation?: number | null, totalread?: number | null, user_post?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, group_post?: { __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null } | null };

export type PostDtoFragment = { __typename?: 'PostDto', postid: number, content?: string | null, title?: string | null, createday?: any | null, updateday?: any | null, image?: string | null, ishide?: number | null, requiredreputation?: number | null, totalread?: number | null, totallike?: number | null, totaldislike?: number | null, totalcomment?: number | null, user_post?: { __typename?: 'User', userid: string, fullname?: string | null, createday?: any | null, bio?: string | null, address?: string | null, image?: string | null } | null, group_post?: { __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null } | null, listtopic?: Array<{ __typename?: 'Post_Topic', posttopicid: number, topic_posttopic?: { __typename?: 'Topic', topicid: number, topicname?: string | null } | null } | null> | null };

export type Post_ReactedFragment = { __typename?: 'Post_Like', postlikeid: number, post_postlike?: { __typename?: 'Post', postid: number } | null, icon_postlike?: { __typename?: 'Icon', iconid: number } | null };

export type BookmarkFragment = { __typename?: 'Bookmark', bookmarkid: number, post_bookmark?: { __typename?: 'Post', postid: number, content?: string | null, title?: string | null, createday?: any | null, updateday?: any | null, image?: string | null, ishide?: number | null, isdelete?: number | null, requiredreputation?: number | null, totalread?: number | null, user_post?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, group_post?: { __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null } | null } | null, user_bookmark?: { __typename?: 'User', userid: string } | null };

export type GetPostQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  pacing?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPostQuery = { __typename?: 'Query', post?: Array<{ __typename?: 'PostDto', postid: number, content?: string | null, title?: string | null, createday?: any | null, updateday?: any | null, image?: string | null, ishide?: number | null, requiredreputation?: number | null, totalread?: number | null, totallike?: number | null, totaldislike?: number | null, totalcomment?: number | null, user_post?: { __typename?: 'User', userid: string, fullname?: string | null, createday?: any | null, bio?: string | null, address?: string | null, image?: string | null } | null, group_post?: { __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null } | null, listtopic?: Array<{ __typename?: 'Post_Topic', posttopicid: number, topic_posttopic?: { __typename?: 'Topic', topicid: number, topicname?: string | null } | null } | null> | null } | null> | null };

export type GetPostByKeywordQueryVariables = Exact<{
  keyword?: InputMaybe<Scalars['String']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostByKeywordQuery = { __typename?: 'Query', find_post_by_keyword?: Array<{ __typename?: 'PostDto', postid: number, content?: string | null, title?: string | null, createday?: any | null, updateday?: any | null, image?: string | null, ishide?: number | null, requiredreputation?: number | null, totalread?: number | null, totallike?: number | null, totaldislike?: number | null, totalcomment?: number | null, user_post?: { __typename?: 'User', userid: string, fullname?: string | null, createday?: any | null, bio?: string | null, address?: string | null, image?: string | null } | null, group_post?: { __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null } | null, listtopic?: Array<{ __typename?: 'Post_Topic', posttopicid: number, topic_posttopic?: { __typename?: 'Topic', topicid: number, topicname?: string | null } | null } | null> | null } | null> | null };

export type GetPostByUserIdQueryVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostByUserIdQuery = { __typename?: 'Query', find_post_by_userid?: Array<{ __typename?: 'PostDto', postid: number, content?: string | null, title?: string | null, createday?: any | null, updateday?: any | null, image?: string | null, ishide?: number | null, requiredreputation?: number | null, totalread?: number | null, totallike?: number | null, totaldislike?: number | null, totalcomment?: number | null, user_post?: { __typename?: 'User', userid: string, fullname?: string | null, createday?: any | null, bio?: string | null, address?: string | null, image?: string | null } | null, group_post?: { __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null } | null, listtopic?: Array<{ __typename?: 'Post_Topic', posttopicid: number, topic_posttopic?: { __typename?: 'Topic', topicid: number, topicname?: string | null } | null } | null> | null } | null> | null };

export type GetPostByIdQueryVariables = Exact<{
  postid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPostByIdQuery = { __typename?: 'Query', find_post_by_id?: { __typename?: 'PostDto', postid: number, content?: string | null, title?: string | null, createday?: any | null, updateday?: any | null, image?: string | null, ishide?: number | null, requiredreputation?: number | null, totalread?: number | null, totallike?: number | null, totaldislike?: number | null, totalcomment?: number | null, user_post?: { __typename?: 'User', userid: string, fullname?: string | null, createday?: any | null, bio?: string | null, address?: string | null, image?: string | null } | null, group_post?: { __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null } | null, listtopic?: Array<{ __typename?: 'Post_Topic', posttopicid: number, topic_posttopic?: { __typename?: 'Topic', topicid: number, topicname?: string | null } | null } | null> | null } | null };

export type GetPostByTopicIdQueryVariables = Exact<{
  topicid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPostByTopicIdQuery = { __typename?: 'Query', find_post_by_topicid?: Array<{ __typename?: 'PostDto', postid: number, content?: string | null, title?: string | null, createday?: any | null, updateday?: any | null, image?: string | null, ishide?: number | null, requiredreputation?: number | null, totalread?: number | null, totallike?: number | null, totaldislike?: number | null, totalcomment?: number | null, user_post?: { __typename?: 'User', userid: string, fullname?: string | null, createday?: any | null, bio?: string | null, address?: string | null, image?: string | null } | null, group_post?: { __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null } | null, listtopic?: Array<{ __typename?: 'Post_Topic', posttopicid: number, topic_posttopic?: { __typename?: 'Topic', topicid: number, topicname?: string | null } | null } | null> | null } | null> | null };

export type GetPostByListTopicIdQueryVariables = Exact<{
  topicids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
}>;


export type GetPostByListTopicIdQuery = { __typename?: 'Query', find_post_by_listtopicid?: Array<{ __typename?: 'PostDto', postid: number, content?: string | null, title?: string | null, createday?: any | null, updateday?: any | null, image?: string | null, ishide?: number | null, requiredreputation?: number | null, totalread?: number | null, totallike?: number | null, totaldislike?: number | null, totalcomment?: number | null, user_post?: { __typename?: 'User', userid: string, fullname?: string | null, createday?: any | null, bio?: string | null, address?: string | null, image?: string | null } | null, group_post?: { __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null } | null, listtopic?: Array<{ __typename?: 'Post_Topic', posttopicid: number, topic_posttopic?: { __typename?: 'Topic', topicid: number, topicname?: string | null } | null } | null> | null } | null> | null };

export type GetPostReactedByUserIdQueryVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostReactedByUserIdQuery = { __typename?: 'Query', find_postlike_byuserid?: Array<{ __typename?: 'Post_Like', postlikeid: number, post_postlike?: { __typename?: 'Post', postid: number } | null, icon_postlike?: { __typename?: 'Icon', iconid: number } | null } | null> | null };

export type GetPostByFollowingQueryVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostByFollowingQuery = { __typename?: 'Query', find_post_by_follow?: Array<{ __typename?: 'PostDto', postid: number, content?: string | null, title?: string | null, createday?: any | null, updateday?: any | null, image?: string | null, ishide?: number | null, requiredreputation?: number | null, totalread?: number | null, totallike?: number | null, totaldislike?: number | null, totalcomment?: number | null, user_post?: { __typename?: 'User', userid: string, fullname?: string | null, createday?: any | null, bio?: string | null, address?: string | null, image?: string | null } | null, group_post?: { __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null } | null, listtopic?: Array<{ __typename?: 'Post_Topic', posttopicid: number, topic_posttopic?: { __typename?: 'Topic', topicid: number, topicname?: string | null } | null } | null> | null } | null> | null };

export type GetPostBookmarkByUserIdQueryVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostBookmarkByUserIdQuery = { __typename?: 'Query', find_all_bookmark_by_userid?: Array<{ __typename?: 'Bookmark', bookmarkid: number, createday?: any | null, post_bookmark?: { __typename?: 'Post', postid: number, content?: string | null, title?: string | null, createday?: any | null, updateday?: any | null, image?: string | null, ishide?: number | null, isdelete?: number | null, requiredreputation?: number | null, totalread?: number | null, user_post?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, group_post?: { __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null } | null } | null, user_bookmark?: { __typename?: 'User', userid: string, fullname?: string | null } | null } | null> | null };

export type GetPostbyGroupIdQueryVariables = Exact<{
  groupid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPostbyGroupIdQuery = { __typename?: 'Query', find_post_in_group?: Array<{ __typename?: 'PostDto', postid: number, content?: string | null, title?: string | null, createday?: any | null, updateday?: any | null, image?: string | null, ishide?: number | null, requiredreputation?: number | null, totalread?: number | null, totallike?: number | null, totaldislike?: number | null, totalcomment?: number | null, user_post?: { __typename?: 'User', userid: string, fullname?: string | null, createday?: any | null, bio?: string | null, address?: string | null, image?: string | null } | null, group_post?: { __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null } | null, listtopic?: Array<{ __typename?: 'Post_Topic', posttopicid: number, topic_posttopic?: { __typename?: 'Topic', topicid: number, topicname?: string | null } | null } | null> | null } | null> | null };

export type CreateReadPostMutationVariables = Exact<{
  postid?: InputMaybe<Scalars['Int']['input']>;
  userid?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateReadPostMutation = { __typename?: 'Mutation', update_totalread_post?: string | null };

export type CreateBookmarkMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
  postid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateBookmarkMutation = { __typename?: 'Mutation', create_bookmark?: { __typename?: 'Bookmark', bookmarkid: number } | null };

export type DeleteBookmarkMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
  postid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteBookmarkMutation = { __typename?: 'Mutation', delete_bookmark?: string | null };

export type CreatePostMutationVariables = Exact<{
  post?: InputMaybe<PostRequest>;
  user?: InputMaybe<UserRequest>;
  topic?: InputMaybe<Array<InputMaybe<TopicRequest>> | InputMaybe<TopicRequest>>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', create_post?: string | null };

export type UpdatePostMutationVariables = Exact<{
  post?: InputMaybe<PostRequest>;
  topic?: InputMaybe<Array<InputMaybe<TopicRequest>> | InputMaybe<TopicRequest>>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', update_post_by_pk?: string | null };

export type CreatePostInGroupMutationVariables = Exact<{
  post?: InputMaybe<PostRequest>;
  user?: InputMaybe<UserRequest>;
  topic?: InputMaybe<Array<InputMaybe<TopicRequest>> | InputMaybe<TopicRequest>>;
  groupid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreatePostInGroupMutation = { __typename?: 'Mutation', create_post_in_group?: string | null };

export type DeletePostMutationVariables = Exact<{
  postid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeletePostMutation = { __typename?: 'Mutation', delete_post_by_pk?: string | null };

export type HidePostMutationVariables = Exact<{
  postid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type HidePostMutation = { __typename?: 'Mutation', hide_post?: string | null };

export type CreatePostReactionMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
  postid?: InputMaybe<Scalars['Int']['input']>;
  iconid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreatePostReactionMutation = { __typename?: 'Mutation', create_icon_for_postlike?: string | null };

export type DeletePostReactionMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
  postid?: InputMaybe<Scalars['Int']['input']>;
  iconid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeletePostReactionMutation = { __typename?: 'Mutation', delete_icon_for_postlike?: string | null };

export type CreateCommentReactionMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
  commentid?: InputMaybe<Scalars['Int']['input']>;
  iconid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CreateCommentReactionMutation = { __typename?: 'Mutation', create_icon_for_commentlike?: string | null };

export type DeleteCommentReactionMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
  commentid?: InputMaybe<Scalars['Int']['input']>;
  iconid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteCommentReactionMutation = { __typename?: 'Mutation', delete_icon_for_commentlike?: string | null };

export type ReportFragment = { __typename?: 'Report', reportid: number, reason?: string | null, content?: string | null, type?: number | null, createday?: any | null, user_report?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, post_report?: { __typename?: 'Post', postid: number, content?: string | null, title?: string | null, createday?: any | null, updateday?: any | null, image?: string | null, ishide?: number | null, isdelete?: number | null, requiredreputation?: number | null, totalread?: number | null, user_post?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, group_post?: { __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null } | null } | null, comment_report?: { __typename?: 'Comment', commentid: number, content?: string | null, createday?: any | null, updateday?: any | null, isdelete?: number | null, user_comment?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, post_comment?: { __typename?: 'Post', postid: number } | null } | null, user_reporter?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null };

export type GetReportByTypeQueryVariables = Exact<{
  type?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetReportByTypeQuery = { __typename?: 'Query', get_report_by_type?: Array<{ __typename?: 'Report', reportid: number, reason?: string | null, content?: string | null, type?: number | null, createday?: any | null, user_report?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, post_report?: { __typename?: 'Post', postid: number, content?: string | null, title?: string | null, createday?: any | null, updateday?: any | null, image?: string | null, ishide?: number | null, isdelete?: number | null, requiredreputation?: number | null, totalread?: number | null, user_post?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, group_post?: { __typename?: 'Group', groupid?: number | null, groupname?: string | null, image?: string | null } | null } | null, comment_report?: { __typename?: 'Comment', commentid: number, content?: string | null, createday?: any | null, updateday?: any | null, isdelete?: number | null, user_comment?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null, post_comment?: { __typename?: 'Post', postid: number } | null } | null, user_reporter?: { __typename?: 'User', userid: string, fullname?: string | null, image?: string | null } | null } | null> | null };

export type CreateReportUserMutationVariables = Exact<{
  report?: InputMaybe<ReportRequest>;
  userid?: InputMaybe<Scalars['String']['input']>;
  reporterid?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateReportUserMutation = { __typename?: 'Mutation', create_report_user?: string | null };

export type CreateReportPostMutationVariables = Exact<{
  report?: InputMaybe<ReportRequest>;
  postid?: InputMaybe<Scalars['Int']['input']>;
  reporterid?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateReportPostMutation = { __typename?: 'Mutation', create_report_post?: string | null };

export type CreateReportCommentMutationVariables = Exact<{
  report?: InputMaybe<ReportRequest>;
  commentid?: InputMaybe<Scalars['Int']['input']>;
  reporterid?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateReportCommentMutation = { __typename?: 'Mutation', create_report_comment?: string | null };

export type DeleteReportUserMutationVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
}>;


export type DeleteReportUserMutation = { __typename?: 'Mutation', delete_report_by_userid?: string | null };

export type DeleteReportPostMutationVariables = Exact<{
  postid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteReportPostMutation = { __typename?: 'Mutation', delete_report_by_postid?: string | null };

export type DeleteReportCommentMutationVariables = Exact<{
  commentid?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteReportCommentMutation = { __typename?: 'Mutation', delete_report_by_commentid?: string | null };

export type GetUserSubscriptionVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserSubscription = { __typename?: 'Subscription', sub_status_user?: { __typename?: 'User', userid: string, username?: string | null, status?: number | null } | null };

export type GetNoticeSubscriptionVariables = Exact<{
  userid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetNoticeSubscription = { __typename?: 'Subscription', sub_all_notice_by_userid?: Array<{ __typename?: 'Notice', noiticeid: number, content?: string | null } | null> | null };

export type TopicFragment = { __typename?: 'Topic', topicid: number, topicname?: string | null, createday?: any | null, ishide?: number | null, isdelete?: number | null };

export type GetTopicQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopicQuery = { __typename?: 'Query', topic?: Array<{ __typename?: 'Topic', topicid: number, topicname?: string | null, createday?: any | null, ishide?: number | null, isdelete?: number | null } | null> | null };

export const UserFragmentDoc = gql`
    fragment user on User {
  userid
  username
  fullname
  email
  address
  phone
  birthday
  gender
  image
  createday
  role {
    roleid
    rolename
  }
  reputation
  status
  isban {
    isbanid
    nameban
    description
  }
  mssv
  bio
  color
  totalfollowing
}
    `;
export const CommentFragmentDoc = gql`
    fragment comment on Comment {
  commentid
  user_comment {
    userid
    fullname
    image
  }
  post_comment {
    postid
  }
  content
  createday
  updateday
  isdelete
}
    `;
export const CmtFragmentDoc = gql`
    fragment cmt on Comment {
  ...comment
  comment_comment {
    ...comment
  }
}
    ${CommentFragmentDoc}`;
export const GroupFragmentDoc = gql`
    fragment group on Group {
  groupid
  groupname
  image
  createday
  user_group {
    userid
    fullname
    image
  }
  reputaion
  description
}
    `;
export const GroupDtoFragmentDoc = gql`
    fragment groupDTO on GroupDTO {
  groupid
  groupname
  image
  createday
  reputation
  admin
  description
  chanel
  totaluser
}
    `;
export const MessageFragmentDoc = gql`
    fragment message on DetailMessageDTO {
  detailmessageid
  messageid
  userid {
    userid
    fullname
    status
  }
  isblock
  lastseen
  lastsend
}
    `;
export const ContentFragmentDoc = gql`
    fragment content on ContentMessageDTO {
  contentid
  content
  createday
  updateday
  parentid
  userid
  messageid
  totalicon {
    iconid
    total
  }
  image
}
    `;
export const NoticeFragmentDoc = gql`
    fragment notice on Notice {
  noiticeid
  user_notice {
    userid
    fullname
  }
  content
  createday
  isseen
  type
  subjectid
}
    `;
export const PostDtoFragmentDoc = gql`
    fragment postDto on PostDto {
  postid
  user_post {
    userid
    fullname
    createday
    bio
    address
    image
  }
  content
  title
  createday
  updateday
  image
  ishide
  requiredreputation
  totalread
  group_post {
    groupid
    groupname
    image
  }
  totallike
  totaldislike
  totalcomment
  listtopic {
    posttopicid
    topic_posttopic {
      topicid
      topicname
    }
  }
}
    `;
export const Post_ReactedFragmentDoc = gql`
    fragment post_reacted on Post_Like {
  postlikeid
  post_postlike {
    postid
  }
  icon_postlike {
    iconid
  }
}
    `;
export const PostFragmentDoc = gql`
    fragment post on Post {
  postid
  user_post {
    userid
    fullname
    image
  }
  content
  title
  createday
  updateday
  image
  ishide
  isdelete
  requiredreputation
  totalread
  group_post {
    groupid
    groupname
    image
  }
}
    `;
export const BookmarkFragmentDoc = gql`
    fragment bookmark on Bookmark {
  bookmarkid
  post_bookmark {
    ...post
  }
  user_bookmark {
    userid
  }
}
    ${PostFragmentDoc}`;
export const ReportFragmentDoc = gql`
    fragment report on Report {
  reportid
  reason
  content
  type
  createday
  user_report {
    userid
    fullname
    image
  }
  post_report {
    postid
    user_post {
      userid
      fullname
      image
    }
    content
    title
    createday
    updateday
    image
    ishide
    isdelete
    requiredreputation
    totalread
    group_post {
      groupid
      groupname
      image
    }
  }
  comment_report {
    commentid
    user_comment {
      userid
      fullname
      image
    }
    post_comment {
      postid
    }
    content
    createday
    updateday
    isdelete
  }
  user_reporter {
    userid
    fullname
    image
  }
}
    `;
export const TopicFragmentDoc = gql`
    fragment topic on Topic {
  topicid
  topicname
  createday
  ishide
  isdelete
}
    `;
export const GetAccountDocument = gql`
    query GetAccount($limit: Int, $pacing: Int) {
  account(limit: $limit, pacing: $pacing) {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetAccountQuery__
 *
 * To run a query within a React component, call `useGetAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      pacing: // value for 'pacing'
 *   },
 * });
 */
export function useGetAccountQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
      }
export function useGetAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
        }
export function useGetAccountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
        }
export type GetAccountQueryHookResult = ReturnType<typeof useGetAccountQuery>;
export type GetAccountLazyQueryHookResult = ReturnType<typeof useGetAccountLazyQuery>;
export type GetAccountSuspenseQueryHookResult = ReturnType<typeof useGetAccountSuspenseQuery>;
export type GetAccountQueryResult = Apollo.QueryResult<GetAccountQuery, GetAccountQueryVariables>;
export const GetAccountByPkDocument = gql`
    query GetAccountByPk($userId: String!) {
  find_account_by_id(userid: $userId) {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetAccountByPkQuery__
 *
 * To run a query within a React component, call `useGetAccountByPkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountByPkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountByPkQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAccountByPkQuery(baseOptions: Apollo.QueryHookOptions<GetAccountByPkQuery, GetAccountByPkQueryVariables> & ({ variables: GetAccountByPkQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountByPkQuery, GetAccountByPkQueryVariables>(GetAccountByPkDocument, options);
      }
export function useGetAccountByPkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountByPkQuery, GetAccountByPkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountByPkQuery, GetAccountByPkQueryVariables>(GetAccountByPkDocument, options);
        }
export function useGetAccountByPkSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAccountByPkQuery, GetAccountByPkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAccountByPkQuery, GetAccountByPkQueryVariables>(GetAccountByPkDocument, options);
        }
export type GetAccountByPkQueryHookResult = ReturnType<typeof useGetAccountByPkQuery>;
export type GetAccountByPkLazyQueryHookResult = ReturnType<typeof useGetAccountByPkLazyQuery>;
export type GetAccountByPkSuspenseQueryHookResult = ReturnType<typeof useGetAccountByPkSuspenseQuery>;
export type GetAccountByPkQueryResult = Apollo.QueryResult<GetAccountByPkQuery, GetAccountByPkQueryVariables>;
export const GetUserGroupDocument = gql`
    query GetUserGroup($groupid: Int, $limit: Int, $pacing: Int) {
  get_user_in_group(groupid: $groupid, limit: $limit, pacing: $pacing) {
    user_groupid
    user_usergroup {
      ...user
    }
    group_usergroup {
      groupid
      groupname
    }
    createday
    checked
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetUserGroupQuery__
 *
 * To run a query within a React component, call `useGetUserGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserGroupQuery({
 *   variables: {
 *      groupid: // value for 'groupid'
 *      limit: // value for 'limit'
 *      pacing: // value for 'pacing'
 *   },
 * });
 */
export function useGetUserGroupQuery(baseOptions?: Apollo.QueryHookOptions<GetUserGroupQuery, GetUserGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserGroupQuery, GetUserGroupQueryVariables>(GetUserGroupDocument, options);
      }
export function useGetUserGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserGroupQuery, GetUserGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserGroupQuery, GetUserGroupQueryVariables>(GetUserGroupDocument, options);
        }
export function useGetUserGroupSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserGroupQuery, GetUserGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserGroupQuery, GetUserGroupQueryVariables>(GetUserGroupDocument, options);
        }
export type GetUserGroupQueryHookResult = ReturnType<typeof useGetUserGroupQuery>;
export type GetUserGroupLazyQueryHookResult = ReturnType<typeof useGetUserGroupLazyQuery>;
export type GetUserGroupSuspenseQueryHookResult = ReturnType<typeof useGetUserGroupSuspenseQuery>;
export type GetUserGroupQueryResult = Apollo.QueryResult<GetUserGroupQuery, GetUserGroupQueryVariables>;
export const GetFollowerUserDocument = gql`
    query GetFollowerUser($userid: String) {
  get_all_follower_by_user(userid: $userid) {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetFollowerUserQuery__
 *
 * To run a query within a React component, call `useGetFollowerUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowerUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowerUserQuery({
 *   variables: {
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useGetFollowerUserQuery(baseOptions?: Apollo.QueryHookOptions<GetFollowerUserQuery, GetFollowerUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowerUserQuery, GetFollowerUserQueryVariables>(GetFollowerUserDocument, options);
      }
export function useGetFollowerUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowerUserQuery, GetFollowerUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowerUserQuery, GetFollowerUserQueryVariables>(GetFollowerUserDocument, options);
        }
export function useGetFollowerUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFollowerUserQuery, GetFollowerUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFollowerUserQuery, GetFollowerUserQueryVariables>(GetFollowerUserDocument, options);
        }
export type GetFollowerUserQueryHookResult = ReturnType<typeof useGetFollowerUserQuery>;
export type GetFollowerUserLazyQueryHookResult = ReturnType<typeof useGetFollowerUserLazyQuery>;
export type GetFollowerUserSuspenseQueryHookResult = ReturnType<typeof useGetFollowerUserSuspenseQuery>;
export type GetFollowerUserQueryResult = Apollo.QueryResult<GetFollowerUserQuery, GetFollowerUserQueryVariables>;
export const GetFollowingUserDocument = gql`
    query GetFollowingUser($followerid: String) {
  get_all_user_by_follower(followerid: $followerid) {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetFollowingUserQuery__
 *
 * To run a query within a React component, call `useGetFollowingUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowingUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowingUserQuery({
 *   variables: {
 *      followerid: // value for 'followerid'
 *   },
 * });
 */
export function useGetFollowingUserQuery(baseOptions?: Apollo.QueryHookOptions<GetFollowingUserQuery, GetFollowingUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowingUserQuery, GetFollowingUserQueryVariables>(GetFollowingUserDocument, options);
      }
export function useGetFollowingUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowingUserQuery, GetFollowingUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowingUserQuery, GetFollowingUserQueryVariables>(GetFollowingUserDocument, options);
        }
export function useGetFollowingUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFollowingUserQuery, GetFollowingUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFollowingUserQuery, GetFollowingUserQueryVariables>(GetFollowingUserDocument, options);
        }
export type GetFollowingUserQueryHookResult = ReturnType<typeof useGetFollowingUserQuery>;
export type GetFollowingUserLazyQueryHookResult = ReturnType<typeof useGetFollowingUserLazyQuery>;
export type GetFollowingUserSuspenseQueryHookResult = ReturnType<typeof useGetFollowingUserSuspenseQuery>;
export type GetFollowingUserQueryResult = Apollo.QueryResult<GetFollowingUserQuery, GetFollowingUserQueryVariables>;
export const GetTopHightReputationUserDocument = gql`
    query GetTopHightReputationUser {
  get_top_reputation_user {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetTopHightReputationUserQuery__
 *
 * To run a query within a React component, call `useGetTopHightReputationUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopHightReputationUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopHightReputationUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopHightReputationUserQuery(baseOptions?: Apollo.QueryHookOptions<GetTopHightReputationUserQuery, GetTopHightReputationUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopHightReputationUserQuery, GetTopHightReputationUserQueryVariables>(GetTopHightReputationUserDocument, options);
      }
export function useGetTopHightReputationUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopHightReputationUserQuery, GetTopHightReputationUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopHightReputationUserQuery, GetTopHightReputationUserQueryVariables>(GetTopHightReputationUserDocument, options);
        }
export function useGetTopHightReputationUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTopHightReputationUserQuery, GetTopHightReputationUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTopHightReputationUserQuery, GetTopHightReputationUserQueryVariables>(GetTopHightReputationUserDocument, options);
        }
export type GetTopHightReputationUserQueryHookResult = ReturnType<typeof useGetTopHightReputationUserQuery>;
export type GetTopHightReputationUserLazyQueryHookResult = ReturnType<typeof useGetTopHightReputationUserLazyQuery>;
export type GetTopHightReputationUserSuspenseQueryHookResult = ReturnType<typeof useGetTopHightReputationUserSuspenseQuery>;
export type GetTopHightReputationUserQueryResult = Apollo.QueryResult<GetTopHightReputationUserQuery, GetTopHightReputationUserQueryVariables>;
export const GetTopLowReputationUserDocument = gql`
    query GetTopLowReputationUser {
  get_list_low_reputation {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetTopLowReputationUserQuery__
 *
 * To run a query within a React component, call `useGetTopLowReputationUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopLowReputationUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopLowReputationUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopLowReputationUserQuery(baseOptions?: Apollo.QueryHookOptions<GetTopLowReputationUserQuery, GetTopLowReputationUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopLowReputationUserQuery, GetTopLowReputationUserQueryVariables>(GetTopLowReputationUserDocument, options);
      }
export function useGetTopLowReputationUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopLowReputationUserQuery, GetTopLowReputationUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopLowReputationUserQuery, GetTopLowReputationUserQueryVariables>(GetTopLowReputationUserDocument, options);
        }
export function useGetTopLowReputationUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTopLowReputationUserQuery, GetTopLowReputationUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTopLowReputationUserQuery, GetTopLowReputationUserQueryVariables>(GetTopLowReputationUserDocument, options);
        }
export type GetTopLowReputationUserQueryHookResult = ReturnType<typeof useGetTopLowReputationUserQuery>;
export type GetTopLowReputationUserLazyQueryHookResult = ReturnType<typeof useGetTopLowReputationUserLazyQuery>;
export type GetTopLowReputationUserSuspenseQueryHookResult = ReturnType<typeof useGetTopLowReputationUserSuspenseQuery>;
export type GetTopLowReputationUserQueryResult = Apollo.QueryResult<GetTopLowReputationUserQuery, GetTopLowReputationUserQueryVariables>;
export const GetListBanUserDocument = gql`
    query GetListBanUser {
  get_list_ban_user {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetListBanUserQuery__
 *
 * To run a query within a React component, call `useGetListBanUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListBanUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListBanUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListBanUserQuery(baseOptions?: Apollo.QueryHookOptions<GetListBanUserQuery, GetListBanUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListBanUserQuery, GetListBanUserQueryVariables>(GetListBanUserDocument, options);
      }
export function useGetListBanUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListBanUserQuery, GetListBanUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListBanUserQuery, GetListBanUserQueryVariables>(GetListBanUserDocument, options);
        }
export function useGetListBanUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetListBanUserQuery, GetListBanUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetListBanUserQuery, GetListBanUserQueryVariables>(GetListBanUserDocument, options);
        }
export type GetListBanUserQueryHookResult = ReturnType<typeof useGetListBanUserQuery>;
export type GetListBanUserLazyQueryHookResult = ReturnType<typeof useGetListBanUserLazyQuery>;
export type GetListBanUserSuspenseQueryHookResult = ReturnType<typeof useGetListBanUserSuspenseQuery>;
export type GetListBanUserQueryResult = Apollo.QueryResult<GetListBanUserQuery, GetListBanUserQueryVariables>;
export const GetUserByKeywordDocument = gql`
    query GetUserByKeyword($keyword: String, $userid: String) {
  get_user_by_keyword(keyword: $keyword, userid: $userid) {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetUserByKeywordQuery__
 *
 * To run a query within a React component, call `useGetUserByKeywordQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByKeywordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByKeywordQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useGetUserByKeywordQuery(baseOptions?: Apollo.QueryHookOptions<GetUserByKeywordQuery, GetUserByKeywordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByKeywordQuery, GetUserByKeywordQueryVariables>(GetUserByKeywordDocument, options);
      }
export function useGetUserByKeywordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByKeywordQuery, GetUserByKeywordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByKeywordQuery, GetUserByKeywordQueryVariables>(GetUserByKeywordDocument, options);
        }
export function useGetUserByKeywordSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserByKeywordQuery, GetUserByKeywordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByKeywordQuery, GetUserByKeywordQueryVariables>(GetUserByKeywordDocument, options);
        }
export type GetUserByKeywordQueryHookResult = ReturnType<typeof useGetUserByKeywordQuery>;
export type GetUserByKeywordLazyQueryHookResult = ReturnType<typeof useGetUserByKeywordLazyQuery>;
export type GetUserByKeywordSuspenseQueryHookResult = ReturnType<typeof useGetUserByKeywordSuspenseQuery>;
export type GetUserByKeywordQueryResult = Apollo.QueryResult<GetUserByKeywordQuery, GetUserByKeywordQueryVariables>;
export const UpdateUserInfoDocument = gql`
    mutation UpdateUserInfo($user: UserRequest) {
  account_update(user: $user) {
    userid
  }
}
    `;
export type UpdateUserInfoMutationFn = Apollo.MutationFunction<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;

/**
 * __useUpdateUserInfoMutation__
 *
 * To run a mutation, you first call `useUpdateUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserInfoMutation, { data, loading, error }] = useUpdateUserInfoMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUpdateUserInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>(UpdateUserInfoDocument, options);
      }
export type UpdateUserInfoMutationHookResult = ReturnType<typeof useUpdateUserInfoMutation>;
export type UpdateUserInfoMutationResult = Apollo.MutationResult<UpdateUserInfoMutation>;
export type UpdateUserInfoMutationOptions = Apollo.BaseMutationOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;
export const CreateFollowDocument = gql`
    mutation CreateFollow($userid: String, $followerid: String) {
  create_follow(userid: $userid, followerid: $followerid)
}
    `;
export type CreateFollowMutationFn = Apollo.MutationFunction<CreateFollowMutation, CreateFollowMutationVariables>;

/**
 * __useCreateFollowMutation__
 *
 * To run a mutation, you first call `useCreateFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFollowMutation, { data, loading, error }] = useCreateFollowMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *      followerid: // value for 'followerid'
 *   },
 * });
 */
export function useCreateFollowMutation(baseOptions?: Apollo.MutationHookOptions<CreateFollowMutation, CreateFollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFollowMutation, CreateFollowMutationVariables>(CreateFollowDocument, options);
      }
export type CreateFollowMutationHookResult = ReturnType<typeof useCreateFollowMutation>;
export type CreateFollowMutationResult = Apollo.MutationResult<CreateFollowMutation>;
export type CreateFollowMutationOptions = Apollo.BaseMutationOptions<CreateFollowMutation, CreateFollowMutationVariables>;
export const DeleteFollowDocument = gql`
    mutation DeleteFollow($userid: String, $followerid: String) {
  delete_follow(userid: $userid, followerid: $followerid)
}
    `;
export type DeleteFollowMutationFn = Apollo.MutationFunction<DeleteFollowMutation, DeleteFollowMutationVariables>;

/**
 * __useDeleteFollowMutation__
 *
 * To run a mutation, you first call `useDeleteFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFollowMutation, { data, loading, error }] = useDeleteFollowMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *      followerid: // value for 'followerid'
 *   },
 * });
 */
export function useDeleteFollowMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFollowMutation, DeleteFollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFollowMutation, DeleteFollowMutationVariables>(DeleteFollowDocument, options);
      }
export type DeleteFollowMutationHookResult = ReturnType<typeof useDeleteFollowMutation>;
export type DeleteFollowMutationResult = Apollo.MutationResult<DeleteFollowMutation>;
export type DeleteFollowMutationOptions = Apollo.BaseMutationOptions<DeleteFollowMutation, DeleteFollowMutationVariables>;
export const BanUserDocument = gql`
    mutation BanUser($userid: String, $isbanid: Int) {
  ban_user(userid: $userid, isbanid: $isbanid) {
    ...user
  }
}
    ${UserFragmentDoc}`;
export type BanUserMutationFn = Apollo.MutationFunction<BanUserMutation, BanUserMutationVariables>;

/**
 * __useBanUserMutation__
 *
 * To run a mutation, you first call `useBanUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBanUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [banUserMutation, { data, loading, error }] = useBanUserMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *      isbanid: // value for 'isbanid'
 *   },
 * });
 */
export function useBanUserMutation(baseOptions?: Apollo.MutationHookOptions<BanUserMutation, BanUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BanUserMutation, BanUserMutationVariables>(BanUserDocument, options);
      }
export type BanUserMutationHookResult = ReturnType<typeof useBanUserMutation>;
export type BanUserMutationResult = Apollo.MutationResult<BanUserMutation>;
export type BanUserMutationOptions = Apollo.BaseMutationOptions<BanUserMutation, BanUserMutationVariables>;
export const UpdateReputationDocument = gql`
    mutation UpdateReputation($userid: String, $reputation: Int) {
  update_reputation(userid: $userid, reputation: $reputation)
}
    `;
export type UpdateReputationMutationFn = Apollo.MutationFunction<UpdateReputationMutation, UpdateReputationMutationVariables>;

/**
 * __useUpdateReputationMutation__
 *
 * To run a mutation, you first call `useUpdateReputationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReputationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReputationMutation, { data, loading, error }] = useUpdateReputationMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *      reputation: // value for 'reputation'
 *   },
 * });
 */
export function useUpdateReputationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReputationMutation, UpdateReputationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReputationMutation, UpdateReputationMutationVariables>(UpdateReputationDocument, options);
      }
export type UpdateReputationMutationHookResult = ReturnType<typeof useUpdateReputationMutation>;
export type UpdateReputationMutationResult = Apollo.MutationResult<UpdateReputationMutation>;
export type UpdateReputationMutationOptions = Apollo.BaseMutationOptions<UpdateReputationMutation, UpdateReputationMutationVariables>;
export const GetCommentByPostIdDocument = gql`
    query GetCommentByPostId($postid: Int) {
  find_all_comment_by_postid(postid: $postid) {
    ...cmt
  }
}
    ${CmtFragmentDoc}`;

/**
 * __useGetCommentByPostIdQuery__
 *
 * To run a query within a React component, call `useGetCommentByPostIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentByPostIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentByPostIdQuery({
 *   variables: {
 *      postid: // value for 'postid'
 *   },
 * });
 */
export function useGetCommentByPostIdQuery(baseOptions?: Apollo.QueryHookOptions<GetCommentByPostIdQuery, GetCommentByPostIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentByPostIdQuery, GetCommentByPostIdQueryVariables>(GetCommentByPostIdDocument, options);
      }
export function useGetCommentByPostIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentByPostIdQuery, GetCommentByPostIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentByPostIdQuery, GetCommentByPostIdQueryVariables>(GetCommentByPostIdDocument, options);
        }
export function useGetCommentByPostIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCommentByPostIdQuery, GetCommentByPostIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCommentByPostIdQuery, GetCommentByPostIdQueryVariables>(GetCommentByPostIdDocument, options);
        }
export type GetCommentByPostIdQueryHookResult = ReturnType<typeof useGetCommentByPostIdQuery>;
export type GetCommentByPostIdLazyQueryHookResult = ReturnType<typeof useGetCommentByPostIdLazyQuery>;
export type GetCommentByPostIdSuspenseQueryHookResult = ReturnType<typeof useGetCommentByPostIdSuspenseQuery>;
export type GetCommentByPostIdQueryResult = Apollo.QueryResult<GetCommentByPostIdQuery, GetCommentByPostIdQueryVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($comment: CommentRequest, $userid: String, $postid: Int) {
  create_comment(comment: $comment, userid: $userid, postid: $postid) {
    ...cmt
  }
}
    ${CmtFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *      userid: // value for 'userid'
 *      postid: // value for 'postid'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateCommentChildDocument = gql`
    mutation CreateCommentChild($comment: CommentRequest, $userid: String, $comment_parentid: Int) {
  create_comment_in_comment(
    comment: $comment
    userid: $userid
    comment_parentid: $comment_parentid
  ) {
    ...cmt
  }
}
    ${CmtFragmentDoc}`;
export type CreateCommentChildMutationFn = Apollo.MutationFunction<CreateCommentChildMutation, CreateCommentChildMutationVariables>;

/**
 * __useCreateCommentChildMutation__
 *
 * To run a mutation, you first call `useCreateCommentChildMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentChildMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentChildMutation, { data, loading, error }] = useCreateCommentChildMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *      userid: // value for 'userid'
 *      comment_parentid: // value for 'comment_parentid'
 *   },
 * });
 */
export function useCreateCommentChildMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentChildMutation, CreateCommentChildMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentChildMutation, CreateCommentChildMutationVariables>(CreateCommentChildDocument, options);
      }
export type CreateCommentChildMutationHookResult = ReturnType<typeof useCreateCommentChildMutation>;
export type CreateCommentChildMutationResult = Apollo.MutationResult<CreateCommentChildMutation>;
export type CreateCommentChildMutationOptions = Apollo.BaseMutationOptions<CreateCommentChildMutation, CreateCommentChildMutationVariables>;
export const GetAllGroupDocument = gql`
    query GetAllGroup($limit: Int, $pacing: Int) {
  get_all_group(limit: $limit, pacing: $pacing) {
    ...group
  }
}
    ${GroupFragmentDoc}`;

/**
 * __useGetAllGroupQuery__
 *
 * To run a query within a React component, call `useGetAllGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllGroupQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      pacing: // value for 'pacing'
 *   },
 * });
 */
export function useGetAllGroupQuery(baseOptions?: Apollo.QueryHookOptions<GetAllGroupQuery, GetAllGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllGroupQuery, GetAllGroupQueryVariables>(GetAllGroupDocument, options);
      }
export function useGetAllGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllGroupQuery, GetAllGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllGroupQuery, GetAllGroupQueryVariables>(GetAllGroupDocument, options);
        }
export function useGetAllGroupSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllGroupQuery, GetAllGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllGroupQuery, GetAllGroupQueryVariables>(GetAllGroupDocument, options);
        }
export type GetAllGroupQueryHookResult = ReturnType<typeof useGetAllGroupQuery>;
export type GetAllGroupLazyQueryHookResult = ReturnType<typeof useGetAllGroupLazyQuery>;
export type GetAllGroupSuspenseQueryHookResult = ReturnType<typeof useGetAllGroupSuspenseQuery>;
export type GetAllGroupQueryResult = Apollo.QueryResult<GetAllGroupQuery, GetAllGroupQueryVariables>;
export const GetGroupByKeywordDocument = gql`
    query GetGroupByKeyword($keyword: String, $userid: String) {
  find_group_by_keyword(keyword: $keyword, userid: $userid) {
    ...group
  }
}
    ${GroupFragmentDoc}`;

/**
 * __useGetGroupByKeywordQuery__
 *
 * To run a query within a React component, call `useGetGroupByKeywordQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupByKeywordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupByKeywordQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useGetGroupByKeywordQuery(baseOptions?: Apollo.QueryHookOptions<GetGroupByKeywordQuery, GetGroupByKeywordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupByKeywordQuery, GetGroupByKeywordQueryVariables>(GetGroupByKeywordDocument, options);
      }
export function useGetGroupByKeywordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupByKeywordQuery, GetGroupByKeywordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupByKeywordQuery, GetGroupByKeywordQueryVariables>(GetGroupByKeywordDocument, options);
        }
export function useGetGroupByKeywordSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetGroupByKeywordQuery, GetGroupByKeywordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGroupByKeywordQuery, GetGroupByKeywordQueryVariables>(GetGroupByKeywordDocument, options);
        }
export type GetGroupByKeywordQueryHookResult = ReturnType<typeof useGetGroupByKeywordQuery>;
export type GetGroupByKeywordLazyQueryHookResult = ReturnType<typeof useGetGroupByKeywordLazyQuery>;
export type GetGroupByKeywordSuspenseQueryHookResult = ReturnType<typeof useGetGroupByKeywordSuspenseQuery>;
export type GetGroupByKeywordQueryResult = Apollo.QueryResult<GetGroupByKeywordQuery, GetGroupByKeywordQueryVariables>;
export const GetGroupByAdminDocument = gql`
    query GetGroupByAdmin($admin: String) {
  get_group_by_admin(admin: $admin) {
    ...group
  }
}
    ${GroupFragmentDoc}`;

/**
 * __useGetGroupByAdminQuery__
 *
 * To run a query within a React component, call `useGetGroupByAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupByAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupByAdminQuery({
 *   variables: {
 *      admin: // value for 'admin'
 *   },
 * });
 */
export function useGetGroupByAdminQuery(baseOptions?: Apollo.QueryHookOptions<GetGroupByAdminQuery, GetGroupByAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupByAdminQuery, GetGroupByAdminQueryVariables>(GetGroupByAdminDocument, options);
      }
export function useGetGroupByAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupByAdminQuery, GetGroupByAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupByAdminQuery, GetGroupByAdminQueryVariables>(GetGroupByAdminDocument, options);
        }
export function useGetGroupByAdminSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetGroupByAdminQuery, GetGroupByAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGroupByAdminQuery, GetGroupByAdminQueryVariables>(GetGroupByAdminDocument, options);
        }
export type GetGroupByAdminQueryHookResult = ReturnType<typeof useGetGroupByAdminQuery>;
export type GetGroupByAdminLazyQueryHookResult = ReturnType<typeof useGetGroupByAdminLazyQuery>;
export type GetGroupByAdminSuspenseQueryHookResult = ReturnType<typeof useGetGroupByAdminSuspenseQuery>;
export type GetGroupByAdminQueryResult = Apollo.QueryResult<GetGroupByAdminQuery, GetGroupByAdminQueryVariables>;
export const GetGroupByUserIdDocument = gql`
    query GetGroupByUserId($userid: String) {
  get_group_by_userid(userid: $userid) {
    ...group
  }
}
    ${GroupFragmentDoc}`;

/**
 * __useGetGroupByUserIdQuery__
 *
 * To run a query within a React component, call `useGetGroupByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupByUserIdQuery({
 *   variables: {
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useGetGroupByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetGroupByUserIdQuery, GetGroupByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupByUserIdQuery, GetGroupByUserIdQueryVariables>(GetGroupByUserIdDocument, options);
      }
export function useGetGroupByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupByUserIdQuery, GetGroupByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupByUserIdQuery, GetGroupByUserIdQueryVariables>(GetGroupByUserIdDocument, options);
        }
export function useGetGroupByUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetGroupByUserIdQuery, GetGroupByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGroupByUserIdQuery, GetGroupByUserIdQueryVariables>(GetGroupByUserIdDocument, options);
        }
export type GetGroupByUserIdQueryHookResult = ReturnType<typeof useGetGroupByUserIdQuery>;
export type GetGroupByUserIdLazyQueryHookResult = ReturnType<typeof useGetGroupByUserIdLazyQuery>;
export type GetGroupByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetGroupByUserIdSuspenseQuery>;
export type GetGroupByUserIdQueryResult = Apollo.QueryResult<GetGroupByUserIdQuery, GetGroupByUserIdQueryVariables>;
export const GetGroupByGroupIdDocument = gql`
    query GetGroupByGroupId($groupid: Int) {
  get_group_by_groupid(groupid: $groupid) {
    ...group
  }
}
    ${GroupFragmentDoc}`;

/**
 * __useGetGroupByGroupIdQuery__
 *
 * To run a query within a React component, call `useGetGroupByGroupIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupByGroupIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupByGroupIdQuery({
 *   variables: {
 *      groupid: // value for 'groupid'
 *   },
 * });
 */
export function useGetGroupByGroupIdQuery(baseOptions?: Apollo.QueryHookOptions<GetGroupByGroupIdQuery, GetGroupByGroupIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupByGroupIdQuery, GetGroupByGroupIdQueryVariables>(GetGroupByGroupIdDocument, options);
      }
export function useGetGroupByGroupIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupByGroupIdQuery, GetGroupByGroupIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupByGroupIdQuery, GetGroupByGroupIdQueryVariables>(GetGroupByGroupIdDocument, options);
        }
export function useGetGroupByGroupIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetGroupByGroupIdQuery, GetGroupByGroupIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGroupByGroupIdQuery, GetGroupByGroupIdQueryVariables>(GetGroupByGroupIdDocument, options);
        }
export type GetGroupByGroupIdQueryHookResult = ReturnType<typeof useGetGroupByGroupIdQuery>;
export type GetGroupByGroupIdLazyQueryHookResult = ReturnType<typeof useGetGroupByGroupIdLazyQuery>;
export type GetGroupByGroupIdSuspenseQueryHookResult = ReturnType<typeof useGetGroupByGroupIdSuspenseQuery>;
export type GetGroupByGroupIdQueryResult = Apollo.QueryResult<GetGroupByGroupIdQuery, GetGroupByGroupIdQueryVariables>;
export const CreateGroupDocument = gql`
    mutation CreateGroup($group: GroupRequest, $admin: String) {
  create_group(group: $group, admin: $admin) {
    ...groupDTO
  }
}
    ${GroupDtoFragmentDoc}`;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      group: // value for 'group'
 *      admin: // value for 'admin'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const UpdateGroupDocument = gql`
    mutation UpdateGroup($group: GroupRequest) {
  update_group(group: $group)
}
    `;
export type UpdateGroupMutationFn = Apollo.MutationFunction<UpdateGroupMutation, UpdateGroupMutationVariables>;

/**
 * __useUpdateGroupMutation__
 *
 * To run a mutation, you first call `useUpdateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupMutation, { data, loading, error }] = useUpdateGroupMutation({
 *   variables: {
 *      group: // value for 'group'
 *   },
 * });
 */
export function useUpdateGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupMutation, UpdateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(UpdateGroupDocument, options);
      }
export type UpdateGroupMutationHookResult = ReturnType<typeof useUpdateGroupMutation>;
export type UpdateGroupMutationResult = Apollo.MutationResult<UpdateGroupMutation>;
export type UpdateGroupMutationOptions = Apollo.BaseMutationOptions<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const DeleteGroupDocument = gql`
    mutation DeleteGroup($groupid: Int) {
  delete_group(groupid: $groupid)
}
    `;
export type DeleteGroupMutationFn = Apollo.MutationFunction<DeleteGroupMutation, DeleteGroupMutationVariables>;

/**
 * __useDeleteGroupMutation__
 *
 * To run a mutation, you first call `useDeleteGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupMutation, { data, loading, error }] = useDeleteGroupMutation({
 *   variables: {
 *      groupid: // value for 'groupid'
 *   },
 * });
 */
export function useDeleteGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGroupMutation, DeleteGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(DeleteGroupDocument, options);
      }
export type DeleteGroupMutationHookResult = ReturnType<typeof useDeleteGroupMutation>;
export type DeleteGroupMutationResult = Apollo.MutationResult<DeleteGroupMutation>;
export type DeleteGroupMutationOptions = Apollo.BaseMutationOptions<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const JoinGroupDocument = gql`
    mutation JoinGroup($userid: String, $groupid: Int) {
  join_group(userid: $userid, groupid: $groupid)
}
    `;
export type JoinGroupMutationFn = Apollo.MutationFunction<JoinGroupMutation, JoinGroupMutationVariables>;

/**
 * __useJoinGroupMutation__
 *
 * To run a mutation, you first call `useJoinGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinGroupMutation, { data, loading, error }] = useJoinGroupMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *      groupid: // value for 'groupid'
 *   },
 * });
 */
export function useJoinGroupMutation(baseOptions?: Apollo.MutationHookOptions<JoinGroupMutation, JoinGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinGroupMutation, JoinGroupMutationVariables>(JoinGroupDocument, options);
      }
export type JoinGroupMutationHookResult = ReturnType<typeof useJoinGroupMutation>;
export type JoinGroupMutationResult = Apollo.MutationResult<JoinGroupMutation>;
export type JoinGroupMutationOptions = Apollo.BaseMutationOptions<JoinGroupMutation, JoinGroupMutationVariables>;
export const LeaveGroupDocument = gql`
    mutation LeaveGroup($userid: String, $groupid: Int) {
  leave_group(userid: $userid, groupid: $groupid)
}
    `;
export type LeaveGroupMutationFn = Apollo.MutationFunction<LeaveGroupMutation, LeaveGroupMutationVariables>;

/**
 * __useLeaveGroupMutation__
 *
 * To run a mutation, you first call `useLeaveGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveGroupMutation, { data, loading, error }] = useLeaveGroupMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *      groupid: // value for 'groupid'
 *   },
 * });
 */
export function useLeaveGroupMutation(baseOptions?: Apollo.MutationHookOptions<LeaveGroupMutation, LeaveGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveGroupMutation, LeaveGroupMutationVariables>(LeaveGroupDocument, options);
      }
export type LeaveGroupMutationHookResult = ReturnType<typeof useLeaveGroupMutation>;
export type LeaveGroupMutationResult = Apollo.MutationResult<LeaveGroupMutation>;
export type LeaveGroupMutationOptions = Apollo.BaseMutationOptions<LeaveGroupMutation, LeaveGroupMutationVariables>;
export const AcceptUserToGroupDocument = gql`
    mutation AcceptUserToGroup($userid: String, $groupid: Int, $check: Int) {
  update_check(userid: $userid, groupid: $groupid, check: $check)
}
    `;
export type AcceptUserToGroupMutationFn = Apollo.MutationFunction<AcceptUserToGroupMutation, AcceptUserToGroupMutationVariables>;

/**
 * __useAcceptUserToGroupMutation__
 *
 * To run a mutation, you first call `useAcceptUserToGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptUserToGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptUserToGroupMutation, { data, loading, error }] = useAcceptUserToGroupMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *      groupid: // value for 'groupid'
 *      check: // value for 'check'
 *   },
 * });
 */
export function useAcceptUserToGroupMutation(baseOptions?: Apollo.MutationHookOptions<AcceptUserToGroupMutation, AcceptUserToGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptUserToGroupMutation, AcceptUserToGroupMutationVariables>(AcceptUserToGroupDocument, options);
      }
export type AcceptUserToGroupMutationHookResult = ReturnType<typeof useAcceptUserToGroupMutation>;
export type AcceptUserToGroupMutationResult = Apollo.MutationResult<AcceptUserToGroupMutation>;
export type AcceptUserToGroupMutationOptions = Apollo.BaseMutationOptions<AcceptUserToGroupMutation, AcceptUserToGroupMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($userid1: String, $userid2: String) {
  create_message(userid1: $userid1, userid2: $userid2) {
    messageid
    messagename
    createday
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      userid1: // value for 'userid1'
 *      userid2: // value for 'userid2'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const CreateContentMessageDocument = gql`
    mutation CreateContentMessage($content: String, $image: String, $messageid: Int, $userid: String, $messageresponseid: Int) {
  create_content_message(
    content: $content
    image: $image
    messageid: $messageid
    userid: $userid
    messageresponseid: $messageresponseid
  )
}
    `;
export type CreateContentMessageMutationFn = Apollo.MutationFunction<CreateContentMessageMutation, CreateContentMessageMutationVariables>;

/**
 * __useCreateContentMessageMutation__
 *
 * To run a mutation, you first call `useCreateContentMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContentMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContentMessageMutation, { data, loading, error }] = useCreateContentMessageMutation({
 *   variables: {
 *      content: // value for 'content'
 *      image: // value for 'image'
 *      messageid: // value for 'messageid'
 *      userid: // value for 'userid'
 *      messageresponseid: // value for 'messageresponseid'
 *   },
 * });
 */
export function useCreateContentMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateContentMessageMutation, CreateContentMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContentMessageMutation, CreateContentMessageMutationVariables>(CreateContentMessageDocument, options);
      }
export type CreateContentMessageMutationHookResult = ReturnType<typeof useCreateContentMessageMutation>;
export type CreateContentMessageMutationResult = Apollo.MutationResult<CreateContentMessageMutation>;
export type CreateContentMessageMutationOptions = Apollo.BaseMutationOptions<CreateContentMessageMutation, CreateContentMessageMutationVariables>;
export const GetMessageByUserIdDocument = gql`
    subscription GetMessageByUserId($userid: String) {
  sub_detail_message_by_userid(userid: $userid) {
    ...message
  }
}
    ${MessageFragmentDoc}`;

/**
 * __useGetMessageByUserIdSubscription__
 *
 * To run a query within a React component, call `useGetMessageByUserIdSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetMessageByUserIdSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessageByUserIdSubscription({
 *   variables: {
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useGetMessageByUserIdSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetMessageByUserIdSubscription, GetMessageByUserIdSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetMessageByUserIdSubscription, GetMessageByUserIdSubscriptionVariables>(GetMessageByUserIdDocument, options);
      }
export type GetMessageByUserIdSubscriptionHookResult = ReturnType<typeof useGetMessageByUserIdSubscription>;
export type GetMessageByUserIdSubscriptionResult = Apollo.SubscriptionResult<GetMessageByUserIdSubscription>;
export const GetDetailMessageByMessageIdDocument = gql`
    subscription GetDetailMessageByMessageId($messageid: Int, $userid: String) {
  sub_content_message_by_messageid(messageid: $messageid, userid: $userid) {
    ...content
  }
}
    ${ContentFragmentDoc}`;

/**
 * __useGetDetailMessageByMessageIdSubscription__
 *
 * To run a query within a React component, call `useGetDetailMessageByMessageIdSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetDetailMessageByMessageIdSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDetailMessageByMessageIdSubscription({
 *   variables: {
 *      messageid: // value for 'messageid'
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useGetDetailMessageByMessageIdSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetDetailMessageByMessageIdSubscription, GetDetailMessageByMessageIdSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetDetailMessageByMessageIdSubscription, GetDetailMessageByMessageIdSubscriptionVariables>(GetDetailMessageByMessageIdDocument, options);
      }
export type GetDetailMessageByMessageIdSubscriptionHookResult = ReturnType<typeof useGetDetailMessageByMessageIdSubscription>;
export type GetDetailMessageByMessageIdSubscriptionResult = Apollo.SubscriptionResult<GetDetailMessageByMessageIdSubscription>;
export const GetNotificationByUserIdDocument = gql`
    subscription GetNotificationByUserId($userid: String) {
  sub_all_notice_by_userid(userid: $userid) {
    ...notice
  }
}
    ${NoticeFragmentDoc}`;

/**
 * __useGetNotificationByUserIdSubscription__
 *
 * To run a query within a React component, call `useGetNotificationByUserIdSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationByUserIdSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationByUserIdSubscription({
 *   variables: {
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useGetNotificationByUserIdSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetNotificationByUserIdSubscription, GetNotificationByUserIdSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetNotificationByUserIdSubscription, GetNotificationByUserIdSubscriptionVariables>(GetNotificationByUserIdDocument, options);
      }
export type GetNotificationByUserIdSubscriptionHookResult = ReturnType<typeof useGetNotificationByUserIdSubscription>;
export type GetNotificationByUserIdSubscriptionResult = Apollo.SubscriptionResult<GetNotificationByUserIdSubscription>;
export const IsSeenDocument = gql`
    mutation IsSeen($noticeid: Int) {
  update_isseen_true(noticeid: $noticeid) {
    ...notice
  }
}
    ${NoticeFragmentDoc}`;
export type IsSeenMutationFn = Apollo.MutationFunction<IsSeenMutation, IsSeenMutationVariables>;

/**
 * __useIsSeenMutation__
 *
 * To run a mutation, you first call `useIsSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIsSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [isSeenMutation, { data, loading, error }] = useIsSeenMutation({
 *   variables: {
 *      noticeid: // value for 'noticeid'
 *   },
 * });
 */
export function useIsSeenMutation(baseOptions?: Apollo.MutationHookOptions<IsSeenMutation, IsSeenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IsSeenMutation, IsSeenMutationVariables>(IsSeenDocument, options);
      }
export type IsSeenMutationHookResult = ReturnType<typeof useIsSeenMutation>;
export type IsSeenMutationResult = Apollo.MutationResult<IsSeenMutation>;
export type IsSeenMutationOptions = Apollo.BaseMutationOptions<IsSeenMutation, IsSeenMutationVariables>;
export const GetPostDocument = gql`
    query GetPost($limit: Int, $pacing: Int) {
  post(limit: $limit, pacing: $pacing) {
    ...postDto
  }
}
    ${PostDtoFragmentDoc}`;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      pacing: // value for 'pacing'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions?: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export function useGetPostSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostSuspenseQueryHookResult = ReturnType<typeof useGetPostSuspenseQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const GetPostByKeywordDocument = gql`
    query GetPostByKeyword($keyword: String, $userid: String) {
  find_post_by_keyword(keyword: $keyword, userid: $userid) {
    ...postDto
  }
}
    ${PostDtoFragmentDoc}`;

/**
 * __useGetPostByKeywordQuery__
 *
 * To run a query within a React component, call `useGetPostByKeywordQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByKeywordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByKeywordQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useGetPostByKeywordQuery(baseOptions?: Apollo.QueryHookOptions<GetPostByKeywordQuery, GetPostByKeywordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostByKeywordQuery, GetPostByKeywordQueryVariables>(GetPostByKeywordDocument, options);
      }
export function useGetPostByKeywordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByKeywordQuery, GetPostByKeywordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostByKeywordQuery, GetPostByKeywordQueryVariables>(GetPostByKeywordDocument, options);
        }
export function useGetPostByKeywordSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostByKeywordQuery, GetPostByKeywordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostByKeywordQuery, GetPostByKeywordQueryVariables>(GetPostByKeywordDocument, options);
        }
export type GetPostByKeywordQueryHookResult = ReturnType<typeof useGetPostByKeywordQuery>;
export type GetPostByKeywordLazyQueryHookResult = ReturnType<typeof useGetPostByKeywordLazyQuery>;
export type GetPostByKeywordSuspenseQueryHookResult = ReturnType<typeof useGetPostByKeywordSuspenseQuery>;
export type GetPostByKeywordQueryResult = Apollo.QueryResult<GetPostByKeywordQuery, GetPostByKeywordQueryVariables>;
export const GetPostByUserIdDocument = gql`
    query GetPostByUserId($userid: String) {
  find_post_by_userid(userid: $userid) {
    ...postDto
  }
}
    ${PostDtoFragmentDoc}`;

/**
 * __useGetPostByUserIdQuery__
 *
 * To run a query within a React component, call `useGetPostByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByUserIdQuery({
 *   variables: {
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useGetPostByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPostByUserIdQuery, GetPostByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostByUserIdQuery, GetPostByUserIdQueryVariables>(GetPostByUserIdDocument, options);
      }
export function useGetPostByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByUserIdQuery, GetPostByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostByUserIdQuery, GetPostByUserIdQueryVariables>(GetPostByUserIdDocument, options);
        }
export function useGetPostByUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostByUserIdQuery, GetPostByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostByUserIdQuery, GetPostByUserIdQueryVariables>(GetPostByUserIdDocument, options);
        }
export type GetPostByUserIdQueryHookResult = ReturnType<typeof useGetPostByUserIdQuery>;
export type GetPostByUserIdLazyQueryHookResult = ReturnType<typeof useGetPostByUserIdLazyQuery>;
export type GetPostByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetPostByUserIdSuspenseQuery>;
export type GetPostByUserIdQueryResult = Apollo.QueryResult<GetPostByUserIdQuery, GetPostByUserIdQueryVariables>;
export const GetPostByIdDocument = gql`
    query GetPostById($postid: Int) {
  find_post_by_id(postid: $postid) {
    ...postDto
  }
}
    ${PostDtoFragmentDoc}`;

/**
 * __useGetPostByIdQuery__
 *
 * To run a query within a React component, call `useGetPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByIdQuery({
 *   variables: {
 *      postid: // value for 'postid'
 *   },
 * });
 */
export function useGetPostByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
      }
export function useGetPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
        }
export function useGetPostByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
        }
export type GetPostByIdQueryHookResult = ReturnType<typeof useGetPostByIdQuery>;
export type GetPostByIdLazyQueryHookResult = ReturnType<typeof useGetPostByIdLazyQuery>;
export type GetPostByIdSuspenseQueryHookResult = ReturnType<typeof useGetPostByIdSuspenseQuery>;
export type GetPostByIdQueryResult = Apollo.QueryResult<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const GetPostByTopicIdDocument = gql`
    query GetPostByTopicId($topicid: Int) {
  find_post_by_topicid(topicid: $topicid) {
    ...postDto
  }
}
    ${PostDtoFragmentDoc}`;

/**
 * __useGetPostByTopicIdQuery__
 *
 * To run a query within a React component, call `useGetPostByTopicIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByTopicIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByTopicIdQuery({
 *   variables: {
 *      topicid: // value for 'topicid'
 *   },
 * });
 */
export function useGetPostByTopicIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPostByTopicIdQuery, GetPostByTopicIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostByTopicIdQuery, GetPostByTopicIdQueryVariables>(GetPostByTopicIdDocument, options);
      }
export function useGetPostByTopicIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByTopicIdQuery, GetPostByTopicIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostByTopicIdQuery, GetPostByTopicIdQueryVariables>(GetPostByTopicIdDocument, options);
        }
export function useGetPostByTopicIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostByTopicIdQuery, GetPostByTopicIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostByTopicIdQuery, GetPostByTopicIdQueryVariables>(GetPostByTopicIdDocument, options);
        }
export type GetPostByTopicIdQueryHookResult = ReturnType<typeof useGetPostByTopicIdQuery>;
export type GetPostByTopicIdLazyQueryHookResult = ReturnType<typeof useGetPostByTopicIdLazyQuery>;
export type GetPostByTopicIdSuspenseQueryHookResult = ReturnType<typeof useGetPostByTopicIdSuspenseQuery>;
export type GetPostByTopicIdQueryResult = Apollo.QueryResult<GetPostByTopicIdQuery, GetPostByTopicIdQueryVariables>;
export const GetPostByListTopicIdDocument = gql`
    query GetPostByListTopicId($topicids: [Int]) {
  find_post_by_listtopicid(topicids: $topicids) {
    ...postDto
  }
}
    ${PostDtoFragmentDoc}`;

/**
 * __useGetPostByListTopicIdQuery__
 *
 * To run a query within a React component, call `useGetPostByListTopicIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByListTopicIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByListTopicIdQuery({
 *   variables: {
 *      topicids: // value for 'topicids'
 *   },
 * });
 */
export function useGetPostByListTopicIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPostByListTopicIdQuery, GetPostByListTopicIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostByListTopicIdQuery, GetPostByListTopicIdQueryVariables>(GetPostByListTopicIdDocument, options);
      }
export function useGetPostByListTopicIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByListTopicIdQuery, GetPostByListTopicIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostByListTopicIdQuery, GetPostByListTopicIdQueryVariables>(GetPostByListTopicIdDocument, options);
        }
export function useGetPostByListTopicIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostByListTopicIdQuery, GetPostByListTopicIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostByListTopicIdQuery, GetPostByListTopicIdQueryVariables>(GetPostByListTopicIdDocument, options);
        }
export type GetPostByListTopicIdQueryHookResult = ReturnType<typeof useGetPostByListTopicIdQuery>;
export type GetPostByListTopicIdLazyQueryHookResult = ReturnType<typeof useGetPostByListTopicIdLazyQuery>;
export type GetPostByListTopicIdSuspenseQueryHookResult = ReturnType<typeof useGetPostByListTopicIdSuspenseQuery>;
export type GetPostByListTopicIdQueryResult = Apollo.QueryResult<GetPostByListTopicIdQuery, GetPostByListTopicIdQueryVariables>;
export const GetPostReactedByUserIdDocument = gql`
    query GetPostReactedByUserId($userid: String) {
  find_postlike_byuserid(userid: $userid) {
    ...post_reacted
  }
}
    ${Post_ReactedFragmentDoc}`;

/**
 * __useGetPostReactedByUserIdQuery__
 *
 * To run a query within a React component, call `useGetPostReactedByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostReactedByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostReactedByUserIdQuery({
 *   variables: {
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useGetPostReactedByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPostReactedByUserIdQuery, GetPostReactedByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostReactedByUserIdQuery, GetPostReactedByUserIdQueryVariables>(GetPostReactedByUserIdDocument, options);
      }
export function useGetPostReactedByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostReactedByUserIdQuery, GetPostReactedByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostReactedByUserIdQuery, GetPostReactedByUserIdQueryVariables>(GetPostReactedByUserIdDocument, options);
        }
export function useGetPostReactedByUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostReactedByUserIdQuery, GetPostReactedByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostReactedByUserIdQuery, GetPostReactedByUserIdQueryVariables>(GetPostReactedByUserIdDocument, options);
        }
export type GetPostReactedByUserIdQueryHookResult = ReturnType<typeof useGetPostReactedByUserIdQuery>;
export type GetPostReactedByUserIdLazyQueryHookResult = ReturnType<typeof useGetPostReactedByUserIdLazyQuery>;
export type GetPostReactedByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetPostReactedByUserIdSuspenseQuery>;
export type GetPostReactedByUserIdQueryResult = Apollo.QueryResult<GetPostReactedByUserIdQuery, GetPostReactedByUserIdQueryVariables>;
export const GetPostByFollowingDocument = gql`
    query GetPostByFollowing($userid: String) {
  find_post_by_follow(userid: $userid) {
    ...postDto
  }
}
    ${PostDtoFragmentDoc}`;

/**
 * __useGetPostByFollowingQuery__
 *
 * To run a query within a React component, call `useGetPostByFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByFollowingQuery({
 *   variables: {
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useGetPostByFollowingQuery(baseOptions?: Apollo.QueryHookOptions<GetPostByFollowingQuery, GetPostByFollowingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostByFollowingQuery, GetPostByFollowingQueryVariables>(GetPostByFollowingDocument, options);
      }
export function useGetPostByFollowingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByFollowingQuery, GetPostByFollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostByFollowingQuery, GetPostByFollowingQueryVariables>(GetPostByFollowingDocument, options);
        }
export function useGetPostByFollowingSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostByFollowingQuery, GetPostByFollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostByFollowingQuery, GetPostByFollowingQueryVariables>(GetPostByFollowingDocument, options);
        }
export type GetPostByFollowingQueryHookResult = ReturnType<typeof useGetPostByFollowingQuery>;
export type GetPostByFollowingLazyQueryHookResult = ReturnType<typeof useGetPostByFollowingLazyQuery>;
export type GetPostByFollowingSuspenseQueryHookResult = ReturnType<typeof useGetPostByFollowingSuspenseQuery>;
export type GetPostByFollowingQueryResult = Apollo.QueryResult<GetPostByFollowingQuery, GetPostByFollowingQueryVariables>;
export const GetPostBookmarkByUserIdDocument = gql`
    query GetPostBookmarkByUserId($userid: String) {
  find_all_bookmark_by_userid(userid: $userid) {
    bookmarkid
    post_bookmark {
      ...post
    }
    user_bookmark {
      userid
      fullname
    }
    createday
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetPostBookmarkByUserIdQuery__
 *
 * To run a query within a React component, call `useGetPostBookmarkByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostBookmarkByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostBookmarkByUserIdQuery({
 *   variables: {
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useGetPostBookmarkByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPostBookmarkByUserIdQuery, GetPostBookmarkByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostBookmarkByUserIdQuery, GetPostBookmarkByUserIdQueryVariables>(GetPostBookmarkByUserIdDocument, options);
      }
export function useGetPostBookmarkByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostBookmarkByUserIdQuery, GetPostBookmarkByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostBookmarkByUserIdQuery, GetPostBookmarkByUserIdQueryVariables>(GetPostBookmarkByUserIdDocument, options);
        }
export function useGetPostBookmarkByUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostBookmarkByUserIdQuery, GetPostBookmarkByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostBookmarkByUserIdQuery, GetPostBookmarkByUserIdQueryVariables>(GetPostBookmarkByUserIdDocument, options);
        }
export type GetPostBookmarkByUserIdQueryHookResult = ReturnType<typeof useGetPostBookmarkByUserIdQuery>;
export type GetPostBookmarkByUserIdLazyQueryHookResult = ReturnType<typeof useGetPostBookmarkByUserIdLazyQuery>;
export type GetPostBookmarkByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetPostBookmarkByUserIdSuspenseQuery>;
export type GetPostBookmarkByUserIdQueryResult = Apollo.QueryResult<GetPostBookmarkByUserIdQuery, GetPostBookmarkByUserIdQueryVariables>;
export const GetPostbyGroupIdDocument = gql`
    query GetPostbyGroupId($groupid: Int) {
  find_post_in_group(groupid: $groupid) {
    ...postDto
  }
}
    ${PostDtoFragmentDoc}`;

/**
 * __useGetPostbyGroupIdQuery__
 *
 * To run a query within a React component, call `useGetPostbyGroupIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostbyGroupIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostbyGroupIdQuery({
 *   variables: {
 *      groupid: // value for 'groupid'
 *   },
 * });
 */
export function useGetPostbyGroupIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPostbyGroupIdQuery, GetPostbyGroupIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostbyGroupIdQuery, GetPostbyGroupIdQueryVariables>(GetPostbyGroupIdDocument, options);
      }
export function useGetPostbyGroupIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostbyGroupIdQuery, GetPostbyGroupIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostbyGroupIdQuery, GetPostbyGroupIdQueryVariables>(GetPostbyGroupIdDocument, options);
        }
export function useGetPostbyGroupIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostbyGroupIdQuery, GetPostbyGroupIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostbyGroupIdQuery, GetPostbyGroupIdQueryVariables>(GetPostbyGroupIdDocument, options);
        }
export type GetPostbyGroupIdQueryHookResult = ReturnType<typeof useGetPostbyGroupIdQuery>;
export type GetPostbyGroupIdLazyQueryHookResult = ReturnType<typeof useGetPostbyGroupIdLazyQuery>;
export type GetPostbyGroupIdSuspenseQueryHookResult = ReturnType<typeof useGetPostbyGroupIdSuspenseQuery>;
export type GetPostbyGroupIdQueryResult = Apollo.QueryResult<GetPostbyGroupIdQuery, GetPostbyGroupIdQueryVariables>;
export const CreateReadPostDocument = gql`
    mutation CreateReadPost($postid: Int, $userid: String) {
  update_totalread_post(postid: $postid, userid: $userid)
}
    `;
export type CreateReadPostMutationFn = Apollo.MutationFunction<CreateReadPostMutation, CreateReadPostMutationVariables>;

/**
 * __useCreateReadPostMutation__
 *
 * To run a mutation, you first call `useCreateReadPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReadPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReadPostMutation, { data, loading, error }] = useCreateReadPostMutation({
 *   variables: {
 *      postid: // value for 'postid'
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useCreateReadPostMutation(baseOptions?: Apollo.MutationHookOptions<CreateReadPostMutation, CreateReadPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReadPostMutation, CreateReadPostMutationVariables>(CreateReadPostDocument, options);
      }
export type CreateReadPostMutationHookResult = ReturnType<typeof useCreateReadPostMutation>;
export type CreateReadPostMutationResult = Apollo.MutationResult<CreateReadPostMutation>;
export type CreateReadPostMutationOptions = Apollo.BaseMutationOptions<CreateReadPostMutation, CreateReadPostMutationVariables>;
export const CreateBookmarkDocument = gql`
    mutation CreateBookmark($userid: String, $postid: Int) {
  create_bookmark(userid: $userid, postid: $postid) {
    bookmarkid
  }
}
    `;
export type CreateBookmarkMutationFn = Apollo.MutationFunction<CreateBookmarkMutation, CreateBookmarkMutationVariables>;

/**
 * __useCreateBookmarkMutation__
 *
 * To run a mutation, you first call `useCreateBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookmarkMutation, { data, loading, error }] = useCreateBookmarkMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *      postid: // value for 'postid'
 *   },
 * });
 */
export function useCreateBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookmarkMutation, CreateBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookmarkMutation, CreateBookmarkMutationVariables>(CreateBookmarkDocument, options);
      }
export type CreateBookmarkMutationHookResult = ReturnType<typeof useCreateBookmarkMutation>;
export type CreateBookmarkMutationResult = Apollo.MutationResult<CreateBookmarkMutation>;
export type CreateBookmarkMutationOptions = Apollo.BaseMutationOptions<CreateBookmarkMutation, CreateBookmarkMutationVariables>;
export const DeleteBookmarkDocument = gql`
    mutation DeleteBookmark($userid: String, $postid: Int) {
  delete_bookmark(userid: $userid, postid: $postid)
}
    `;
export type DeleteBookmarkMutationFn = Apollo.MutationFunction<DeleteBookmarkMutation, DeleteBookmarkMutationVariables>;

/**
 * __useDeleteBookmarkMutation__
 *
 * To run a mutation, you first call `useDeleteBookmarkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookmarkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookmarkMutation, { data, loading, error }] = useDeleteBookmarkMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *      postid: // value for 'postid'
 *   },
 * });
 */
export function useDeleteBookmarkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBookmarkMutation, DeleteBookmarkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBookmarkMutation, DeleteBookmarkMutationVariables>(DeleteBookmarkDocument, options);
      }
export type DeleteBookmarkMutationHookResult = ReturnType<typeof useDeleteBookmarkMutation>;
export type DeleteBookmarkMutationResult = Apollo.MutationResult<DeleteBookmarkMutation>;
export type DeleteBookmarkMutationOptions = Apollo.BaseMutationOptions<DeleteBookmarkMutation, DeleteBookmarkMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($post: PostRequest, $user: UserRequest, $topic: [TopicRequest]) {
  create_post(post: $post, user: $user, topic: $topic)
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      post: // value for 'post'
 *      user: // value for 'user'
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($post: PostRequest, $topic: [TopicRequest]) {
  update_post_by_pk(post: $post, topic: $topic)
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      post: // value for 'post'
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const CreatePostInGroupDocument = gql`
    mutation CreatePostInGroup($post: PostRequest, $user: UserRequest, $topic: [TopicRequest], $groupid: Int) {
  create_post_in_group(post: $post, user: $user, topic: $topic, groupid: $groupid)
}
    `;
export type CreatePostInGroupMutationFn = Apollo.MutationFunction<CreatePostInGroupMutation, CreatePostInGroupMutationVariables>;

/**
 * __useCreatePostInGroupMutation__
 *
 * To run a mutation, you first call `useCreatePostInGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostInGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostInGroupMutation, { data, loading, error }] = useCreatePostInGroupMutation({
 *   variables: {
 *      post: // value for 'post'
 *      user: // value for 'user'
 *      topic: // value for 'topic'
 *      groupid: // value for 'groupid'
 *   },
 * });
 */
export function useCreatePostInGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostInGroupMutation, CreatePostInGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostInGroupMutation, CreatePostInGroupMutationVariables>(CreatePostInGroupDocument, options);
      }
export type CreatePostInGroupMutationHookResult = ReturnType<typeof useCreatePostInGroupMutation>;
export type CreatePostInGroupMutationResult = Apollo.MutationResult<CreatePostInGroupMutation>;
export type CreatePostInGroupMutationOptions = Apollo.BaseMutationOptions<CreatePostInGroupMutation, CreatePostInGroupMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postid: Int) {
  delete_post_by_pk(postid: $postid)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postid: // value for 'postid'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const HidePostDocument = gql`
    mutation HidePost($postid: Int) {
  hide_post(postid: $postid)
}
    `;
export type HidePostMutationFn = Apollo.MutationFunction<HidePostMutation, HidePostMutationVariables>;

/**
 * __useHidePostMutation__
 *
 * To run a mutation, you first call `useHidePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHidePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hidePostMutation, { data, loading, error }] = useHidePostMutation({
 *   variables: {
 *      postid: // value for 'postid'
 *   },
 * });
 */
export function useHidePostMutation(baseOptions?: Apollo.MutationHookOptions<HidePostMutation, HidePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HidePostMutation, HidePostMutationVariables>(HidePostDocument, options);
      }
export type HidePostMutationHookResult = ReturnType<typeof useHidePostMutation>;
export type HidePostMutationResult = Apollo.MutationResult<HidePostMutation>;
export type HidePostMutationOptions = Apollo.BaseMutationOptions<HidePostMutation, HidePostMutationVariables>;
export const CreatePostReactionDocument = gql`
    mutation CreatePostReaction($userid: String, $postid: Int, $iconid: Int) {
  create_icon_for_postlike(userid: $userid, postid: $postid, iconid: $iconid)
}
    `;
export type CreatePostReactionMutationFn = Apollo.MutationFunction<CreatePostReactionMutation, CreatePostReactionMutationVariables>;

/**
 * __useCreatePostReactionMutation__
 *
 * To run a mutation, you first call `useCreatePostReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostReactionMutation, { data, loading, error }] = useCreatePostReactionMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *      postid: // value for 'postid'
 *      iconid: // value for 'iconid'
 *   },
 * });
 */
export function useCreatePostReactionMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostReactionMutation, CreatePostReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostReactionMutation, CreatePostReactionMutationVariables>(CreatePostReactionDocument, options);
      }
export type CreatePostReactionMutationHookResult = ReturnType<typeof useCreatePostReactionMutation>;
export type CreatePostReactionMutationResult = Apollo.MutationResult<CreatePostReactionMutation>;
export type CreatePostReactionMutationOptions = Apollo.BaseMutationOptions<CreatePostReactionMutation, CreatePostReactionMutationVariables>;
export const DeletePostReactionDocument = gql`
    mutation DeletePostReaction($userid: String, $postid: Int, $iconid: Int) {
  delete_icon_for_postlike(userid: $userid, postid: $postid, iconid: $iconid)
}
    `;
export type DeletePostReactionMutationFn = Apollo.MutationFunction<DeletePostReactionMutation, DeletePostReactionMutationVariables>;

/**
 * __useDeletePostReactionMutation__
 *
 * To run a mutation, you first call `useDeletePostReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostReactionMutation, { data, loading, error }] = useDeletePostReactionMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *      postid: // value for 'postid'
 *      iconid: // value for 'iconid'
 *   },
 * });
 */
export function useDeletePostReactionMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostReactionMutation, DeletePostReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostReactionMutation, DeletePostReactionMutationVariables>(DeletePostReactionDocument, options);
      }
export type DeletePostReactionMutationHookResult = ReturnType<typeof useDeletePostReactionMutation>;
export type DeletePostReactionMutationResult = Apollo.MutationResult<DeletePostReactionMutation>;
export type DeletePostReactionMutationOptions = Apollo.BaseMutationOptions<DeletePostReactionMutation, DeletePostReactionMutationVariables>;
export const CreateCommentReactionDocument = gql`
    mutation CreateCommentReaction($userid: String, $commentid: Int, $iconid: Int) {
  create_icon_for_commentlike(
    userid: $userid
    commentid: $commentid
    iconid: $iconid
  )
}
    `;
export type CreateCommentReactionMutationFn = Apollo.MutationFunction<CreateCommentReactionMutation, CreateCommentReactionMutationVariables>;

/**
 * __useCreateCommentReactionMutation__
 *
 * To run a mutation, you first call `useCreateCommentReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentReactionMutation, { data, loading, error }] = useCreateCommentReactionMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *      commentid: // value for 'commentid'
 *      iconid: // value for 'iconid'
 *   },
 * });
 */
export function useCreateCommentReactionMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentReactionMutation, CreateCommentReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentReactionMutation, CreateCommentReactionMutationVariables>(CreateCommentReactionDocument, options);
      }
export type CreateCommentReactionMutationHookResult = ReturnType<typeof useCreateCommentReactionMutation>;
export type CreateCommentReactionMutationResult = Apollo.MutationResult<CreateCommentReactionMutation>;
export type CreateCommentReactionMutationOptions = Apollo.BaseMutationOptions<CreateCommentReactionMutation, CreateCommentReactionMutationVariables>;
export const DeleteCommentReactionDocument = gql`
    mutation DeleteCommentReaction($userid: String, $commentid: Int, $iconid: Int) {
  delete_icon_for_commentlike(
    userid: $userid
    commentid: $commentid
    iconid: $iconid
  )
}
    `;
export type DeleteCommentReactionMutationFn = Apollo.MutationFunction<DeleteCommentReactionMutation, DeleteCommentReactionMutationVariables>;

/**
 * __useDeleteCommentReactionMutation__
 *
 * To run a mutation, you first call `useDeleteCommentReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentReactionMutation, { data, loading, error }] = useDeleteCommentReactionMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *      commentid: // value for 'commentid'
 *      iconid: // value for 'iconid'
 *   },
 * });
 */
export function useDeleteCommentReactionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentReactionMutation, DeleteCommentReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentReactionMutation, DeleteCommentReactionMutationVariables>(DeleteCommentReactionDocument, options);
      }
export type DeleteCommentReactionMutationHookResult = ReturnType<typeof useDeleteCommentReactionMutation>;
export type DeleteCommentReactionMutationResult = Apollo.MutationResult<DeleteCommentReactionMutation>;
export type DeleteCommentReactionMutationOptions = Apollo.BaseMutationOptions<DeleteCommentReactionMutation, DeleteCommentReactionMutationVariables>;
export const GetReportByTypeDocument = gql`
    query GetReportByType($type: Int) {
  get_report_by_type(type: $type) {
    ...report
  }
}
    ${ReportFragmentDoc}`;

/**
 * __useGetReportByTypeQuery__
 *
 * To run a query within a React component, call `useGetReportByTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReportByTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReportByTypeQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetReportByTypeQuery(baseOptions?: Apollo.QueryHookOptions<GetReportByTypeQuery, GetReportByTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReportByTypeQuery, GetReportByTypeQueryVariables>(GetReportByTypeDocument, options);
      }
export function useGetReportByTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReportByTypeQuery, GetReportByTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReportByTypeQuery, GetReportByTypeQueryVariables>(GetReportByTypeDocument, options);
        }
export function useGetReportByTypeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetReportByTypeQuery, GetReportByTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReportByTypeQuery, GetReportByTypeQueryVariables>(GetReportByTypeDocument, options);
        }
export type GetReportByTypeQueryHookResult = ReturnType<typeof useGetReportByTypeQuery>;
export type GetReportByTypeLazyQueryHookResult = ReturnType<typeof useGetReportByTypeLazyQuery>;
export type GetReportByTypeSuspenseQueryHookResult = ReturnType<typeof useGetReportByTypeSuspenseQuery>;
export type GetReportByTypeQueryResult = Apollo.QueryResult<GetReportByTypeQuery, GetReportByTypeQueryVariables>;
export const CreateReportUserDocument = gql`
    mutation CreateReportUser($report: ReportRequest, $userid: String, $reporterid: String) {
  create_report_user(report: $report, userid: $userid, reporterid: $reporterid)
}
    `;
export type CreateReportUserMutationFn = Apollo.MutationFunction<CreateReportUserMutation, CreateReportUserMutationVariables>;

/**
 * __useCreateReportUserMutation__
 *
 * To run a mutation, you first call `useCreateReportUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReportUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReportUserMutation, { data, loading, error }] = useCreateReportUserMutation({
 *   variables: {
 *      report: // value for 'report'
 *      userid: // value for 'userid'
 *      reporterid: // value for 'reporterid'
 *   },
 * });
 */
export function useCreateReportUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateReportUserMutation, CreateReportUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReportUserMutation, CreateReportUserMutationVariables>(CreateReportUserDocument, options);
      }
export type CreateReportUserMutationHookResult = ReturnType<typeof useCreateReportUserMutation>;
export type CreateReportUserMutationResult = Apollo.MutationResult<CreateReportUserMutation>;
export type CreateReportUserMutationOptions = Apollo.BaseMutationOptions<CreateReportUserMutation, CreateReportUserMutationVariables>;
export const CreateReportPostDocument = gql`
    mutation CreateReportPost($report: ReportRequest, $postid: Int, $reporterid: String) {
  create_report_post(report: $report, postid: $postid, reporterid: $reporterid)
}
    `;
export type CreateReportPostMutationFn = Apollo.MutationFunction<CreateReportPostMutation, CreateReportPostMutationVariables>;

/**
 * __useCreateReportPostMutation__
 *
 * To run a mutation, you first call `useCreateReportPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReportPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReportPostMutation, { data, loading, error }] = useCreateReportPostMutation({
 *   variables: {
 *      report: // value for 'report'
 *      postid: // value for 'postid'
 *      reporterid: // value for 'reporterid'
 *   },
 * });
 */
export function useCreateReportPostMutation(baseOptions?: Apollo.MutationHookOptions<CreateReportPostMutation, CreateReportPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReportPostMutation, CreateReportPostMutationVariables>(CreateReportPostDocument, options);
      }
export type CreateReportPostMutationHookResult = ReturnType<typeof useCreateReportPostMutation>;
export type CreateReportPostMutationResult = Apollo.MutationResult<CreateReportPostMutation>;
export type CreateReportPostMutationOptions = Apollo.BaseMutationOptions<CreateReportPostMutation, CreateReportPostMutationVariables>;
export const CreateReportCommentDocument = gql`
    mutation CreateReportComment($report: ReportRequest, $commentid: Int, $reporterid: String) {
  create_report_comment(
    report: $report
    commentid: $commentid
    reporterid: $reporterid
  )
}
    `;
export type CreateReportCommentMutationFn = Apollo.MutationFunction<CreateReportCommentMutation, CreateReportCommentMutationVariables>;

/**
 * __useCreateReportCommentMutation__
 *
 * To run a mutation, you first call `useCreateReportCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReportCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReportCommentMutation, { data, loading, error }] = useCreateReportCommentMutation({
 *   variables: {
 *      report: // value for 'report'
 *      commentid: // value for 'commentid'
 *      reporterid: // value for 'reporterid'
 *   },
 * });
 */
export function useCreateReportCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateReportCommentMutation, CreateReportCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReportCommentMutation, CreateReportCommentMutationVariables>(CreateReportCommentDocument, options);
      }
export type CreateReportCommentMutationHookResult = ReturnType<typeof useCreateReportCommentMutation>;
export type CreateReportCommentMutationResult = Apollo.MutationResult<CreateReportCommentMutation>;
export type CreateReportCommentMutationOptions = Apollo.BaseMutationOptions<CreateReportCommentMutation, CreateReportCommentMutationVariables>;
export const DeleteReportUserDocument = gql`
    mutation DeleteReportUser($userid: String) {
  delete_report_by_userid(userid: $userid)
}
    `;
export type DeleteReportUserMutationFn = Apollo.MutationFunction<DeleteReportUserMutation, DeleteReportUserMutationVariables>;

/**
 * __useDeleteReportUserMutation__
 *
 * To run a mutation, you first call `useDeleteReportUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReportUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReportUserMutation, { data, loading, error }] = useDeleteReportUserMutation({
 *   variables: {
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useDeleteReportUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReportUserMutation, DeleteReportUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReportUserMutation, DeleteReportUserMutationVariables>(DeleteReportUserDocument, options);
      }
export type DeleteReportUserMutationHookResult = ReturnType<typeof useDeleteReportUserMutation>;
export type DeleteReportUserMutationResult = Apollo.MutationResult<DeleteReportUserMutation>;
export type DeleteReportUserMutationOptions = Apollo.BaseMutationOptions<DeleteReportUserMutation, DeleteReportUserMutationVariables>;
export const DeleteReportPostDocument = gql`
    mutation DeleteReportPost($postid: Int) {
  delete_report_by_postid(postid: $postid)
}
    `;
export type DeleteReportPostMutationFn = Apollo.MutationFunction<DeleteReportPostMutation, DeleteReportPostMutationVariables>;

/**
 * __useDeleteReportPostMutation__
 *
 * To run a mutation, you first call `useDeleteReportPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReportPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReportPostMutation, { data, loading, error }] = useDeleteReportPostMutation({
 *   variables: {
 *      postid: // value for 'postid'
 *   },
 * });
 */
export function useDeleteReportPostMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReportPostMutation, DeleteReportPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReportPostMutation, DeleteReportPostMutationVariables>(DeleteReportPostDocument, options);
      }
export type DeleteReportPostMutationHookResult = ReturnType<typeof useDeleteReportPostMutation>;
export type DeleteReportPostMutationResult = Apollo.MutationResult<DeleteReportPostMutation>;
export type DeleteReportPostMutationOptions = Apollo.BaseMutationOptions<DeleteReportPostMutation, DeleteReportPostMutationVariables>;
export const DeleteReportCommentDocument = gql`
    mutation DeleteReportComment($commentid: Int) {
  delete_report_by_commentid(commentid: $commentid)
}
    `;
export type DeleteReportCommentMutationFn = Apollo.MutationFunction<DeleteReportCommentMutation, DeleteReportCommentMutationVariables>;

/**
 * __useDeleteReportCommentMutation__
 *
 * To run a mutation, you first call `useDeleteReportCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReportCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReportCommentMutation, { data, loading, error }] = useDeleteReportCommentMutation({
 *   variables: {
 *      commentid: // value for 'commentid'
 *   },
 * });
 */
export function useDeleteReportCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReportCommentMutation, DeleteReportCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReportCommentMutation, DeleteReportCommentMutationVariables>(DeleteReportCommentDocument, options);
      }
export type DeleteReportCommentMutationHookResult = ReturnType<typeof useDeleteReportCommentMutation>;
export type DeleteReportCommentMutationResult = Apollo.MutationResult<DeleteReportCommentMutation>;
export type DeleteReportCommentMutationOptions = Apollo.BaseMutationOptions<DeleteReportCommentMutation, DeleteReportCommentMutationVariables>;
export const GetUserDocument = gql`
    subscription GetUser($userid: String) {
  sub_status_user(userid: $userid) {
    userid
    username
    status
  }
}
    `;

/**
 * __useGetUserSubscription__
 *
 * To run a query within a React component, call `useGetUserSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSubscription({
 *   variables: {
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useGetUserSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetUserSubscription, GetUserSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetUserSubscription, GetUserSubscriptionVariables>(GetUserDocument, options);
      }
export type GetUserSubscriptionHookResult = ReturnType<typeof useGetUserSubscription>;
export type GetUserSubscriptionResult = Apollo.SubscriptionResult<GetUserSubscription>;
export const GetNoticeDocument = gql`
    subscription GetNotice($userid: String) {
  sub_all_notice_by_userid(userid: $userid) {
    noiticeid
    content
  }
}
    `;

/**
 * __useGetNoticeSubscription__
 *
 * To run a query within a React component, call `useGetNoticeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetNoticeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoticeSubscription({
 *   variables: {
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useGetNoticeSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetNoticeSubscription, GetNoticeSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetNoticeSubscription, GetNoticeSubscriptionVariables>(GetNoticeDocument, options);
      }
export type GetNoticeSubscriptionHookResult = ReturnType<typeof useGetNoticeSubscription>;
export type GetNoticeSubscriptionResult = Apollo.SubscriptionResult<GetNoticeSubscription>;
export const GetTopicDocument = gql`
    query GetTopic {
  topic {
    ...topic
  }
}
    ${TopicFragmentDoc}`;

/**
 * __useGetTopicQuery__
 *
 * To run a query within a React component, call `useGetTopicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopicQuery(baseOptions?: Apollo.QueryHookOptions<GetTopicQuery, GetTopicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopicQuery, GetTopicQueryVariables>(GetTopicDocument, options);
      }
export function useGetTopicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicQuery, GetTopicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopicQuery, GetTopicQueryVariables>(GetTopicDocument, options);
        }
export function useGetTopicSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTopicQuery, GetTopicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTopicQuery, GetTopicQueryVariables>(GetTopicDocument, options);
        }
export type GetTopicQueryHookResult = ReturnType<typeof useGetTopicQuery>;
export type GetTopicLazyQueryHookResult = ReturnType<typeof useGetTopicLazyQuery>;
export type GetTopicSuspenseQueryHookResult = ReturnType<typeof useGetTopicSuspenseQuery>;
export type GetTopicQueryResult = Apollo.QueryResult<GetTopicQuery, GetTopicQueryVariables>;