export interface IDataUserById {
  idUser: number;
  username: string;
  email: string;
  password: string;
  role: number;
  avatarUser: string;
  follow: number;
  status: number;
}
export interface ImageChoice {
  // Define the structure of the imageChoice
  idImage: number;
  userCreateId: number;
  linkImage: string;
  categoryImage: string;
  titleImage: string;
  description: string;
  sourceImage: string;
}
export interface IDataUser {
  avatarUser: string;
  email: string;
  follow: string | null;
  idUser: number;
  password: string;
  role: number;
  status: number;
  username: string;
}
export interface ISaveImage {
  idSaveImage: number;
  imageSavedId: number;
  userSavedId: number;
}
export interface ImageComment {
  idImage: number;
  userCreateId: number;
  linkImage: string;
  categoryImage: string;
  titleImage: string;
  description: string;
  sourceImage: string;
  imageCommentId: number;
  idComment: number;
  username: string;
  content: string;
  timecreate: string;
  avatarUser: string | null;
}

export interface IOperationImage {
  idOperationImage?: number;
  imageOperationId: number;
  userLikeImageId: number | null;
  userLoveImageId: number | null;
  userSavedImageId: number | null;
  idImage: number;
  avatarUser: string;
  username: string;
}
export interface ILikeLoveImage {
  idOperationImage?: number;
  imageOperationId: number;
  userLikeImageId: number | null;
  userLoveImageId: number | null;
  userSavedImageId: number | null;
}

export interface IFollowUser {
  avatarUser: string;
  email: string;
  follow: string | null;
  idUser: number;
  password: string;
  role: number;
  status: number;
  username: string;
  idImage: number;
}
export interface ILikeLoveComment {
  idLikeLoveComment: number;
  commentLikeLoveId: number;
  userLikeCommentId: number | null;
  userLoveCommentId: number | null;
  idComment: number;
  avatarUser: string;
  username: string;
}
export interface IComment {
  idComment: number;
  imageCommentId: number;
  userCommentId: number;
  content: string;
  timecreate: string;
}
export interface ICommentRepply {
  idRepComment: number;
  commentRepId: number | null;
  userRepCommentId: number;
  contentRepComment: string;
  timecreateRep: string;
}
export interface IRepComment {
  idComment: number;
  idRepComment: number;
  commentRepId: number | null;
  userRepCommentId: number;
  contentRepComment: string;
  timecreateRep: string;
  username: string;
  avatarUser: string | null;
}
export interface IFollow {
  idFollow?: number;
  userFollowedbyId: number;
  userFollowOtherId: number;
}
