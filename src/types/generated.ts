import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '@/types/context';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Achievement = {
  __typename?: 'Achievement';
  _id: Scalars['ID']['output'];
  description: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  threshold: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type AdminCreateSpecializationInput = {
  categoryName: Scalars['String']['input'];
};

export type AdminSpecialization = {
  __typename?: 'AdminSpecialization';
  categoryName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export enum AllowedMediaEnum {
  Audio = 'AUDIO',
  Image = 'IMAGE',
  Text = 'TEXT',
  Video = 'VIDEO'
}

export type Appointment = {
  __typename?: 'Appointment';
  chatRoomId?: Maybe<Scalars['String']['output']>;
  clientId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  endedAt?: Maybe<Scalars['String']['output']>;
  isFree: Scalars['Boolean']['output'];
  lawyerId: Scalars['String']['output'];
  price?: Maybe<Scalars['Int']['output']>;
  schedule: Scalars['String']['output'];
  specializationId: Scalars['String']['output'];
  status: AppointmentStatus;
};

export enum AppointmentStatus {
  Completed = 'COMPLETED',
  Pending = 'PENDING'
}

export type Availability = {
  __typename?: 'Availability';
  day: DayOfWeek;
  endTime: Scalars['String']['output'];
  lawyerId: Scalars['String']['output'];
  startTime: Scalars['String']['output'];
};

export type ChatRoom = {
  __typename?: 'ChatRoom';
  _id: Scalars['String']['output'];
  allowedMedia?: Maybe<AllowedMediaEnum>;
  appointmentId: Scalars['String']['output'];
  participants: Array<Scalars['String']['output']>;
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ID']['output'];
  author: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  post: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type CreateAchievementInput = {
  description: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  threshold: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CreateAppointmentInput = {
  clientId: Scalars['String']['input'];
  createdAt: Scalars['String']['input'];
  endedAt: Scalars['String']['input'];
  lawyerId: Scalars['String']['input'];
  schedule: Scalars['String']['input'];
};

export type CreateChatRoomInput = {
  allowedMedia?: InputMaybe<AllowedMediaEnum>;
  appointmentId: Scalars['String']['input'];
  participants: Array<Scalars['String']['input']>;
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
};

export type CreateDocumentInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  images: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  type?: InputMaybe<MediaType>;
};

export type CreateLawyerInput = {
  achievements?: InputMaybe<Array<Scalars['ID']['input']>>;
  bio?: InputMaybe<Scalars['String']['input']>;
  document?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  lawyerId: Scalars['ID']['input'];
  licenseNumber: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
  university?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNotificationInput = {
  content: Scalars['String']['input'];
  recipientId: Scalars['ID']['input'];
  type: NotificationType;
};

export type CreatePostInput = {
  content: PostContentInput;
  specialization: Array<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
};

export type CreateReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Int']['input'];
};

export type CreateSpecializationInput = {
  lawyerId: Scalars['ID']['input'];
  pricePerHour?: InputMaybe<Scalars['Int']['input']>;
  specializationId: Scalars['ID']['input'];
  subscription: Scalars['Boolean']['input'];
};

export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type DeleteCommentInput = {
  commentId: Scalars['ID']['input'];
};

export type Document = {
  __typename?: 'Document';
  _id: Scalars['ID']['output'];
  clientId: Scalars['String']['output'];
  content?: Maybe<Scalars['String']['output']>;
  images: Array<Scalars['String']['output']>;
  lawyerId?: Maybe<Scalars['ID']['output']>;
  reviewComment?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ReviewStatus>;
  title: Scalars['String']['output'];
  type?: Maybe<DocumentMediaType>;
};

export enum DocumentMediaType {
  File = 'FILE',
  Image = 'IMAGE',
  Text = 'TEXT'
}

export type Lawyer = {
  __typename?: 'Lawyer';
  _id: Scalars['ID']['output'];
  achievements: Array<Achievement>;
  bio?: Maybe<Scalars['String']['output']>;
  clerkUserId?: Maybe<Scalars['String']['output']>;
  clientId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  document?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  lawyerId: Scalars['ID']['output'];
  licenseNumber: Scalars['String']['output'];
  profilePicture: Scalars['String']['output'];
  rating?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<LawyerRequestStatus>;
  university?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export enum LawyerRequestStatus {
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Verified = 'VERIFIED'
}

export type LawyerSpecializationInput = {
  categoryId: Scalars['ID']['input'];
  pricePerHour?: InputMaybe<Scalars['Int']['input']>;
  subscription?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ManageLawyerRequestInput = {
  lawyerId: Scalars['ID']['input'];
  status: LawyerRequestStatus;
};

export type MediaInput = {
  audio?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  video?: InputMaybe<Scalars['String']['input']>;
};

export enum MediaType {
  Audio = 'AUDIO',
  File = 'FILE',
  Image = 'IMAGE',
  Text = 'TEXT',
  Video = 'VIDEO'
}

export type Message = {
  __typename?: 'Message';
  chatRoomId: Scalars['ID']['output'];
  content?: Maybe<Scalars['String']['output']>;
  type: MediaType;
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adminCreateSpecialization: AdminSpecialization;
  createAchievement: Achievement;
  createAppointment?: Maybe<Appointment>;
  createChatRoom?: Maybe<Scalars['String']['output']>;
  createChatRoomAfterAppointment: ChatRoom;
  createComment: Comment;
  createDocument: Document;
  createLawyer: Lawyer;
  createMessage?: Maybe<Message>;
  createNotification: Notification;
  createPost: Post;
  createReview: Review;
  createSpecialization: Array<Maybe<Specialization>>;
  deleteAchievement: Scalars['Boolean']['output'];
  deleteComment: Scalars['Boolean']['output'];
  deleteLawyer: Scalars['Boolean']['output'];
  deletePost: Scalars['Boolean']['output'];
  deleteReview: Scalars['Boolean']['output'];
  deleteSpecialization: Scalars['Boolean']['output'];
  manageLawyerRequest: Lawyer;
  markAllNotificationsAsRead: Scalars['Boolean']['output'];
  markNotificationAsRead: Notification;
  reviewDocument: Document;
  setAvailability?: Maybe<Availability>;
  updateAchievement: Achievement;
  updateChatRoom: ChatRoom;
  updateComment: Comment;
  updateLawyer: Lawyer;
  updatePost: Post;
  updateReview: Review;
  updateSpecialization: Specialization;
};


export type MutationAdminCreateSpecializationArgs = {
  input: AdminCreateSpecializationInput;
};


export type MutationCreateAchievementArgs = {
  input: CreateAchievementInput;
};


export type MutationCreateAppointmentArgs = {
  input: CreateAppointmentInput;
};


export type MutationCreateChatRoomArgs = {
  appointmentId: Scalars['String']['input'];
};


export type MutationCreateChatRoomAfterAppointmentArgs = {
  input: CreateChatRoomInput;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateDocumentArgs = {
  input: CreateDocumentInput;
};


export type MutationCreateLawyerArgs = {
  input: CreateLawyerInput;
};


export type MutationCreateMessageArgs = {
  chatRoomId: Scalars['ID']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  type: MediaType;
  userId: Scalars['String']['input'];
};


export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};


export type MutationCreateSpecializationArgs = {
  input?: InputMaybe<SpecializationInput>;
};


export type MutationDeleteAchievementArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


export type MutationDeleteLawyerArgs = {
  lawyerId: Scalars['ID']['input'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['ID']['input'];
};


export type MutationDeleteReviewArgs = {
  reviewId: Scalars['ID']['input'];
};


export type MutationDeleteSpecializationArgs = {
  specializationId: Scalars['ID']['input'];
};


export type MutationManageLawyerRequestArgs = {
  input: ManageLawyerRequestInput;
};


export type MutationMarkNotificationAsReadArgs = {
  notificationId: Scalars['ID']['input'];
};


export type MutationReviewDocumentArgs = {
  input: ReviewDocumentInput;
};


export type MutationSetAvailabilityArgs = {
  day: DayOfWeek;
  endTime: Scalars['String']['input'];
  lawyerId: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};


export type MutationUpdateAchievementArgs = {
  input: UpdateAchievementInput;
};


export type MutationUpdateChatRoomArgs = {
  input: UpdateChatRoomInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationUpdateLawyerArgs = {
  input: UpdateLawyerInput;
  lawyerId: Scalars['ID']['input'];
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
  postId: Scalars['ID']['input'];
};


export type MutationUpdateReviewArgs = {
  input: UpdateReviewInput;
  reviewId: Scalars['ID']['input'];
};


export type MutationUpdateSpecializationArgs = {
  input: UpdateSpecializationInput;
  specializationId: Scalars['ID']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  content: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  read: Scalars['Boolean']['output'];
  recipientId: Scalars['ID']['output'];
  type: NotificationType;
};

export enum NotificationType {
  AppointmentCreated = 'APPOINTMENT_CREATED',
  AppointmentReminder = 'APPOINTMENT_REMINDER',
  AppointmentStarted = 'APPOINTMENT_STARTED',
  LawyerApproved = 'LAWYER_APPROVED',
  ReviewReceived = 'REVIEW_RECEIVED'
}

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID']['output'];
  content: PostContent;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  lawyerId: Scalars['ID']['output'];
  specialization: Array<Specialization>;
  title: Scalars['String']['output'];
  type: MediaType;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type PostContent = {
  __typename?: 'PostContent';
  audio?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['String']['output']>;
};

export type PostContentInput = {
  audio?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  video?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getAchievements?: Maybe<Array<Maybe<Achievement>>>;
  getAdminSpecializations: Array<AdminSpecialization>;
  getAppointmentById?: Maybe<Appointment>;
  getAppointments?: Maybe<Array<Maybe<Appointment>>>;
  getAppointmentsByLawyer?: Maybe<Array<Maybe<Appointment>>>;
  getAppointmentsByUser?: Maybe<Array<Maybe<Appointment>>>;
  getAvailability?: Maybe<Array<Maybe<Availability>>>;
  getChatRoomById?: Maybe<ChatRoom>;
  getChatRoomsByAppointment: Array<ChatRoom>;
  getCommentsByPost: Array<Comment>;
  getDocumentsByStatus: Array<Document>;
  getDocumentsByUser: Array<Document>;
  getLawyerById?: Maybe<Lawyer>;
  getLawyers: Array<Lawyer>;
  getLawyersByAchievement: Array<Lawyer>;
  getLawyersBySpecialization: Array<Lawyer>;
  getLawyersByStatus: Array<Lawyer>;
  getMessages: Array<Message>;
  getPostById?: Maybe<Post>;
  getPostsByLawyer: Array<Post>;
  getPostsBySpecializationId: Array<Post>;
  getReviewsByLawyer: Array<Review>;
  getReviewsByUser: Array<Review>;
  getSpecializationsByLawyer: Array<Specialization>;
  myNotifications: Array<Notification>;
  searchPosts: Array<Post>;
};


export type QueryGetAchievementsArgs = {
  lawyerId: Scalars['ID']['input'];
};


export type QueryGetAppointmentByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetAppointmentsByLawyerArgs = {
  lawyerId: Scalars['String']['input'];
};


export type QueryGetAppointmentsByUserArgs = {
  clientId: Scalars['String']['input'];
};


export type QueryGetAvailabilityArgs = {
  day: DayOfWeek;
  lawyerId: Scalars['String']['input'];
};


export type QueryGetChatRoomByIdArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetChatRoomsByAppointmentArgs = {
  appointmentId: Scalars['String']['input'];
};


export type QueryGetCommentsByPostArgs = {
  postId: Scalars['ID']['input'];
};


export type QueryGetDocumentsByStatusArgs = {
  status: ReviewStatus;
};


export type QueryGetDocumentsByUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetLawyerByIdArgs = {
  lawyerId: Scalars['ID']['input'];
};


export type QueryGetLawyersByAchievementArgs = {
  achievementId: Scalars['ID']['input'];
};


export type QueryGetLawyersBySpecializationArgs = {
  specializationId: Scalars['ID']['input'];
};


export type QueryGetLawyersByStatusArgs = {
  status: LawyerRequestStatus;
};


export type QueryGetMessagesArgs = {
  chatRoomId: Scalars['ID']['input'];
};


export type QueryGetPostByIdArgs = {
  postId: Scalars['ID']['input'];
};


export type QueryGetPostsByLawyerArgs = {
  lawyerId: Scalars['String']['input'];
};


export type QueryGetPostsBySpecializationIdArgs = {
  specializationId: Scalars['ID']['input'];
};


export type QueryGetReviewsByLawyerArgs = {
  lawyerId: Scalars['ID']['input'];
};


export type QueryGetReviewsByUserArgs = {
  clientId: Scalars['ID']['input'];
};


export type QueryGetSpecializationsByLawyerArgs = {
  lawyerId: Scalars['ID']['input'];
};


export type QuerySearchPostsArgs = {
  query: Scalars['String']['input'];
};

export type Review = {
  __typename?: 'Review';
  clientId: Scalars['ID']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  lawyerId: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type ReviewDocumentInput = {
  documentId: Scalars['ID']['input'];
  reviewComment?: InputMaybe<Scalars['String']['input']>;
  status: ReviewStatus;
};

export enum ReviewStatus {
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Reviewed = 'REVIEWED'
}

export type Specialization = {
  __typename?: 'Specialization';
  _id: Scalars['ID']['output'];
  lawyerId: Scalars['ID']['output'];
  pricePerHour?: Maybe<Scalars['Int']['output']>;
  specializationId: Scalars['ID']['output'];
  subscription: Scalars['Boolean']['output'];
};

export type SpecializationInput = {
  specializations: Array<CreateSpecializationInput>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded?: Maybe<Message>;
};


export type SubscriptionMessageAddedArgs = {
  chatRoomId: Scalars['ID']['input'];
};

export type UpdateAchievementInput = {
  _id: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  threshold?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateChatRoomInput = {
  _id: Scalars['String']['input'];
  allowedMedia?: InputMaybe<AllowedMediaEnum>;
  appointmentId?: InputMaybe<Scalars['String']['input']>;
  participants?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateCommentInput = {
  commentId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
};

export type UpdateLawyerInput = {
  achievements?: InputMaybe<Array<Scalars['ID']['input']>>;
  bio?: InputMaybe<Scalars['String']['input']>;
  document?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  licenseNumber?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  specialization?: InputMaybe<Array<LawyerSpecializationInput>>;
  university?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostInput = {
  content?: InputMaybe<PostContentInput>;
  specialization?: InputMaybe<Array<Scalars['ID']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateSpecializationInput = {
  pricePerHour?: InputMaybe<Scalars['Int']['input']>;
  subscription: Scalars['Boolean']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Achievement: ResolverTypeWrapper<Achievement>;
  AdminCreateSpecializationInput: AdminCreateSpecializationInput;
  AdminSpecialization: ResolverTypeWrapper<AdminSpecialization>;
  AllowedMediaEnum: AllowedMediaEnum;
  Appointment: ResolverTypeWrapper<Appointment>;
  AppointmentStatus: AppointmentStatus;
  Availability: ResolverTypeWrapper<Availability>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ChatRoom: ResolverTypeWrapper<ChatRoom>;
  Comment: ResolverTypeWrapper<Comment>;
  CreateAchievementInput: CreateAchievementInput;
  CreateAppointmentInput: CreateAppointmentInput;
  CreateChatRoomInput: CreateChatRoomInput;
  CreateCommentInput: CreateCommentInput;
  CreateDocumentInput: CreateDocumentInput;
  CreateLawyerInput: CreateLawyerInput;
  CreateNotificationInput: CreateNotificationInput;
  CreatePostInput: CreatePostInput;
  CreateReviewInput: CreateReviewInput;
  CreateSpecializationInput: CreateSpecializationInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DayOfWeek: DayOfWeek;
  DeleteCommentInput: DeleteCommentInput;
  Document: ResolverTypeWrapper<Document>;
  DocumentMediaType: DocumentMediaType;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Lawyer: ResolverTypeWrapper<Lawyer>;
  LawyerRequestStatus: LawyerRequestStatus;
  LawyerSpecializationInput: LawyerSpecializationInput;
  ManageLawyerRequestInput: ManageLawyerRequestInput;
  MediaInput: MediaInput;
  MediaType: MediaType;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  Notification: ResolverTypeWrapper<Notification>;
  NotificationType: NotificationType;
  Post: ResolverTypeWrapper<Post>;
  PostContent: ResolverTypeWrapper<PostContent>;
  PostContentInput: PostContentInput;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  ReviewDocumentInput: ReviewDocumentInput;
  ReviewStatus: ReviewStatus;
  Specialization: ResolverTypeWrapper<Specialization>;
  SpecializationInput: SpecializationInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  UpdateAchievementInput: UpdateAchievementInput;
  UpdateChatRoomInput: UpdateChatRoomInput;
  UpdateCommentInput: UpdateCommentInput;
  UpdateLawyerInput: UpdateLawyerInput;
  UpdatePostInput: UpdatePostInput;
  UpdateReviewInput: UpdateReviewInput;
  UpdateSpecializationInput: UpdateSpecializationInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Achievement: Achievement;
  AdminCreateSpecializationInput: AdminCreateSpecializationInput;
  AdminSpecialization: AdminSpecialization;
  Appointment: Appointment;
  Availability: Availability;
  Boolean: Scalars['Boolean']['output'];
  ChatRoom: ChatRoom;
  Comment: Comment;
  CreateAchievementInput: CreateAchievementInput;
  CreateAppointmentInput: CreateAppointmentInput;
  CreateChatRoomInput: CreateChatRoomInput;
  CreateCommentInput: CreateCommentInput;
  CreateDocumentInput: CreateDocumentInput;
  CreateLawyerInput: CreateLawyerInput;
  CreateNotificationInput: CreateNotificationInput;
  CreatePostInput: CreatePostInput;
  CreateReviewInput: CreateReviewInput;
  CreateSpecializationInput: CreateSpecializationInput;
  Date: Scalars['Date']['output'];
  DeleteCommentInput: DeleteCommentInput;
  Document: Document;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Lawyer: Lawyer;
  LawyerSpecializationInput: LawyerSpecializationInput;
  ManageLawyerRequestInput: ManageLawyerRequestInput;
  MediaInput: MediaInput;
  Message: Message;
  Mutation: {};
  Notification: Notification;
  Post: Post;
  PostContent: PostContent;
  PostContentInput: PostContentInput;
  Query: {};
  Review: Review;
  ReviewDocumentInput: ReviewDocumentInput;
  Specialization: Specialization;
  SpecializationInput: SpecializationInput;
  String: Scalars['String']['output'];
  Subscription: {};
  UpdateAchievementInput: UpdateAchievementInput;
  UpdateChatRoomInput: UpdateChatRoomInput;
  UpdateCommentInput: UpdateCommentInput;
  UpdateLawyerInput: UpdateLawyerInput;
  UpdatePostInput: UpdatePostInput;
  UpdateReviewInput: UpdateReviewInput;
  UpdateSpecializationInput: UpdateSpecializationInput;
};

export type AchievementResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Achievement'] = ResolversParentTypes['Achievement']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  threshold?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminSpecializationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AdminSpecialization'] = ResolversParentTypes['AdminSpecialization']> = {
  categoryName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppointmentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Appointment'] = ResolversParentTypes['Appointment']> = {
  chatRoomId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clientId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isFree?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lawyerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  schedule?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specializationId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['AppointmentStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AvailabilityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Availability'] = ResolversParentTypes['Availability']> = {
  day?: Resolver<ResolversTypes['DayOfWeek'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lawyerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatRoomResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ChatRoom'] = ResolversParentTypes['ChatRoom']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  allowedMedia?: Resolver<Maybe<ResolversTypes['AllowedMediaEnum']>, ParentType, ContextType>;
  appointmentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  participants?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DocumentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  clientId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  lawyerId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  reviewComment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ReviewStatus']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['DocumentMediaType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LawyerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Lawyer'] = ResolversParentTypes['Lawyer']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  achievements?: Resolver<Array<ResolversTypes['Achievement']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clerkUserId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clientId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  document?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lawyerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  licenseNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profilePicture?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['LawyerRequestStatus']>, ParentType, ContextType>;
  university?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  chatRoomId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MediaType'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  adminCreateSpecialization?: Resolver<ResolversTypes['AdminSpecialization'], ParentType, ContextType, RequireFields<MutationAdminCreateSpecializationArgs, 'input'>>;
  createAchievement?: Resolver<ResolversTypes['Achievement'], ParentType, ContextType, RequireFields<MutationCreateAchievementArgs, 'input'>>;
  createAppointment?: Resolver<Maybe<ResolversTypes['Appointment']>, ParentType, ContextType, RequireFields<MutationCreateAppointmentArgs, 'input'>>;
  createChatRoom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreateChatRoomArgs, 'appointmentId'>>;
  createChatRoomAfterAppointment?: Resolver<ResolversTypes['ChatRoom'], ParentType, ContextType, RequireFields<MutationCreateChatRoomAfterAppointmentArgs, 'input'>>;
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'input'>>;
  createDocument?: Resolver<ResolversTypes['Document'], ParentType, ContextType, RequireFields<MutationCreateDocumentArgs, 'input'>>;
  createLawyer?: Resolver<ResolversTypes['Lawyer'], ParentType, ContextType, RequireFields<MutationCreateLawyerArgs, 'input'>>;
  createMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'chatRoomId' | 'type' | 'userId'>>;
  createNotification?: Resolver<ResolversTypes['Notification'], ParentType, ContextType, RequireFields<MutationCreateNotificationArgs, 'input'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>;
  createReview?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationCreateReviewArgs, 'input'>>;
  createSpecialization?: Resolver<Array<Maybe<ResolversTypes['Specialization']>>, ParentType, ContextType, Partial<MutationCreateSpecializationArgs>>;
  deleteAchievement?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteAchievementArgs, 'id'>>;
  deleteComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'input'>>;
  deleteLawyer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteLawyerArgs, 'lawyerId'>>;
  deletePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'postId'>>;
  deleteReview?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteReviewArgs, 'reviewId'>>;
  deleteSpecialization?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteSpecializationArgs, 'specializationId'>>;
  manageLawyerRequest?: Resolver<ResolversTypes['Lawyer'], ParentType, ContextType, RequireFields<MutationManageLawyerRequestArgs, 'input'>>;
  markAllNotificationsAsRead?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  markNotificationAsRead?: Resolver<ResolversTypes['Notification'], ParentType, ContextType, RequireFields<MutationMarkNotificationAsReadArgs, 'notificationId'>>;
  reviewDocument?: Resolver<ResolversTypes['Document'], ParentType, ContextType, RequireFields<MutationReviewDocumentArgs, 'input'>>;
  setAvailability?: Resolver<Maybe<ResolversTypes['Availability']>, ParentType, ContextType, RequireFields<MutationSetAvailabilityArgs, 'day' | 'endTime' | 'lawyerId' | 'startTime'>>;
  updateAchievement?: Resolver<ResolversTypes['Achievement'], ParentType, ContextType, RequireFields<MutationUpdateAchievementArgs, 'input'>>;
  updateChatRoom?: Resolver<ResolversTypes['ChatRoom'], ParentType, ContextType, RequireFields<MutationUpdateChatRoomArgs, 'input'>>;
  updateComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationUpdateCommentArgs, 'input'>>;
  updateLawyer?: Resolver<ResolversTypes['Lawyer'], ParentType, ContextType, RequireFields<MutationUpdateLawyerArgs, 'input' | 'lawyerId'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'input' | 'postId'>>;
  updateReview?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationUpdateReviewArgs, 'input' | 'reviewId'>>;
  updateSpecialization?: Resolver<ResolversTypes['Specialization'], ParentType, ContextType, RequireFields<MutationUpdateSpecializationArgs, 'input' | 'specializationId'>>;
};

export type NotificationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  recipientId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['NotificationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['PostContent'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lawyerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  specialization?: Resolver<Array<ResolversTypes['Specialization']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MediaType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostContentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostContent'] = ResolversParentTypes['PostContent']> = {
  audio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAchievements?: Resolver<Maybe<Array<Maybe<ResolversTypes['Achievement']>>>, ParentType, ContextType, RequireFields<QueryGetAchievementsArgs, 'lawyerId'>>;
  getAdminSpecializations?: Resolver<Array<ResolversTypes['AdminSpecialization']>, ParentType, ContextType>;
  getAppointmentById?: Resolver<Maybe<ResolversTypes['Appointment']>, ParentType, ContextType, RequireFields<QueryGetAppointmentByIdArgs, 'id'>>;
  getAppointments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Appointment']>>>, ParentType, ContextType>;
  getAppointmentsByLawyer?: Resolver<Maybe<Array<Maybe<ResolversTypes['Appointment']>>>, ParentType, ContextType, RequireFields<QueryGetAppointmentsByLawyerArgs, 'lawyerId'>>;
  getAppointmentsByUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['Appointment']>>>, ParentType, ContextType, RequireFields<QueryGetAppointmentsByUserArgs, 'clientId'>>;
  getAvailability?: Resolver<Maybe<Array<Maybe<ResolversTypes['Availability']>>>, ParentType, ContextType, RequireFields<QueryGetAvailabilityArgs, 'day' | 'lawyerId'>>;
  getChatRoomById?: Resolver<Maybe<ResolversTypes['ChatRoom']>, ParentType, ContextType, RequireFields<QueryGetChatRoomByIdArgs, '_id'>>;
  getChatRoomsByAppointment?: Resolver<Array<ResolversTypes['ChatRoom']>, ParentType, ContextType, RequireFields<QueryGetChatRoomsByAppointmentArgs, 'appointmentId'>>;
  getCommentsByPost?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryGetCommentsByPostArgs, 'postId'>>;
  getDocumentsByStatus?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType, RequireFields<QueryGetDocumentsByStatusArgs, 'status'>>;
  getDocumentsByUser?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType, RequireFields<QueryGetDocumentsByUserArgs, 'userId'>>;
  getLawyerById?: Resolver<Maybe<ResolversTypes['Lawyer']>, ParentType, ContextType, RequireFields<QueryGetLawyerByIdArgs, 'lawyerId'>>;
  getLawyers?: Resolver<Array<ResolversTypes['Lawyer']>, ParentType, ContextType>;
  getLawyersByAchievement?: Resolver<Array<ResolversTypes['Lawyer']>, ParentType, ContextType, RequireFields<QueryGetLawyersByAchievementArgs, 'achievementId'>>;
  getLawyersBySpecialization?: Resolver<Array<ResolversTypes['Lawyer']>, ParentType, ContextType, RequireFields<QueryGetLawyersBySpecializationArgs, 'specializationId'>>;
  getLawyersByStatus?: Resolver<Array<ResolversTypes['Lawyer']>, ParentType, ContextType, RequireFields<QueryGetLawyersByStatusArgs, 'status'>>;
  getMessages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryGetMessagesArgs, 'chatRoomId'>>;
  getPostById?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryGetPostByIdArgs, 'postId'>>;
  getPostsByLawyer?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryGetPostsByLawyerArgs, 'lawyerId'>>;
  getPostsBySpecializationId?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryGetPostsBySpecializationIdArgs, 'specializationId'>>;
  getReviewsByLawyer?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<QueryGetReviewsByLawyerArgs, 'lawyerId'>>;
  getReviewsByUser?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<QueryGetReviewsByUserArgs, 'clientId'>>;
  getSpecializationsByLawyer?: Resolver<Array<ResolversTypes['Specialization']>, ParentType, ContextType, RequireFields<QueryGetSpecializationsByLawyerArgs, 'lawyerId'>>;
  myNotifications?: Resolver<Array<ResolversTypes['Notification']>, ParentType, ContextType>;
  searchPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerySearchPostsArgs, 'query'>>;
};

export type ReviewResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  clientId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lawyerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecializationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Specialization'] = ResolversParentTypes['Specialization']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lawyerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pricePerHour?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  specializationId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  subscription?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  messageAdded?: SubscriptionResolver<Maybe<ResolversTypes['Message']>, "messageAdded", ParentType, ContextType, RequireFields<SubscriptionMessageAddedArgs, 'chatRoomId'>>;
};

export type Resolvers<ContextType = Context> = {
  Achievement?: AchievementResolvers<ContextType>;
  AdminSpecialization?: AdminSpecializationResolvers<ContextType>;
  Appointment?: AppointmentResolvers<ContextType>;
  Availability?: AvailabilityResolvers<ContextType>;
  ChatRoom?: ChatRoomResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Document?: DocumentResolvers<ContextType>;
  Lawyer?: LawyerResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostContent?: PostContentResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  Specialization?: SpecializationResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

