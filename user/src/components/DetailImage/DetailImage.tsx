import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import { BsFillCaretRightSquareFill } from "react-icons/bs";
// import { BsSuitHeart } from "react-icons/bs";
import { MdOutlineSend } from "react-icons/md";
import { BiSolidHappyHeartEyes } from "react-icons/bi";
import { MdTagFaces } from "react-icons/md";
import { CgHeart } from "react-icons/cg";
import "./DetailImage.css";
import { useNavigate, useParams } from "react-router-dom";
import { ImageAPI } from "../../api/Image";
import { UserAPI } from "../../api/User";
import { CommentAPI } from "../../api/Comment";
import { FollowAPI } from "../../api/Follow";
import { ImageChoice } from "../../types/type";
import { IDataUser } from "../../types/type";
import { ISaveImage } from "../../types/type";
import { ImageComment } from "../../types/type";
import { IOperationImage } from "../../types/type";
import { IFollowUser } from "../../types/type";
import { ILikeLoveComment } from "../../types/type";
import { IComment } from "../../types/type";
import { ILikeLoveImage } from "../../types/type";
import { IFollow } from "../../types/type";
import { IDataUserById } from "../../types/type";
import { useSelector } from "react-redux";

const DetailImage: React.FC = () => {
  const paramsId = useParams<{ id: string }>();

  const numberId = Number(paramsId.id);
  const [imageList, setImageList] = useState<ImageComment[]>([]);
  const [imageChoice, setImageChoice] = useState<ImageChoice[]>([]);
  const [userList, setUserList] = useState<IDataUser[]>([]);
  const [loveCommentList, setLoveCommentList] = useState<
    ILikeLoveComment[]
  >([]);
  const [likeCommentList, setLikeCommentList] = useState<
    ILikeLoveComment[]
  >([]);
  const [followUserList, setFollowUserList] = useState<IFollowUser[]>(
    []
  );
  const [loveImageList, setLoveImageList] = useState<
    IOperationImage[]
  >([]);
  const [likeImageList, setLikeImageList] = useState<
    IOperationImage[]
  >([]);
  const [allCommentList, setAllCommentList] = useState([]);
  const [isCall, setIsCall] = useState(true);
  const [isCallUser, setIsCallUser] = useState(true);
  const [isComment, setIsComment] = useState(true);
  const [isFollow, setIsFollow] = useState(true);
  const [isOperation, setIsOperation] = useState(true);
  const [isChoiceImg, setIsChoiceImg] = useState(true);
  const [isCallImage, setIsCallImage] = useState(true);
  const [usersCreateImage, setUsersCreateImage] = useState<
    IDataUser[]
  >([]);
  const [userFollowed, setUserFollowed] = useState([]);
  // const [isCallFollow, setIsCallFollow] = useState(true);
  const [imageSaved, setImageSaved] = useState<ISaveImage[]>([]);
  const [likeLoveComment, setLikeLoveComment] = useState<
    ILikeLoveComment[]
  >([]);
  const [operationImage, setOperationImage] = useState<
    IOperationImage[]
  >([]);
  const [userFollowOthers, setUserFollowOthers] = useState<IFollow[]>(
    []
  );
  const [statusFollow, setStatusFollow] = useState(false);
  const dataUpdateName = useSelector((state: any) => state.editName);
  console.log(dataUpdateName);
  const userLogin =
    JSON.parse(localStorage.getItem("userLogin")) || [];
  const navigate = useNavigate();

  // let idUserCreate = "";
  let imageStoreSaved = false;

  // gọi dữ liệu bảng images_saved_user
  const fetchImageSaved = async () => {
    try {
      const response = await ImageAPI.getImageSaved();
      setImageSaved(response.data.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    fetchImageSaved();
  }, []);
  const checkImgSaved = imageSaved?.filter(
    (item) =>
      item.imageSavedId === numberId &&
      item.userSavedId === userLogin?.idUser
  );
  if (checkImgSaved?.length > 0) {
    imageStoreSaved = true;
  }

  const fetchUserJoinImage = async (id: number) => {
    try {
      const response1 = await ImageAPI.getImageCreatedUser(id);
      setUsersCreateImage(response1.data.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  // gọi dữ liệu API user join image
  useEffect(() => {
    if (isCallImage) {
      fetchUserJoinImage(numberId);
    }
    return () => {
      setIsCallImage(false);
    };
  }, [isCallImage]);
  const idUserCreate = usersCreateImage[0]?.idUser;
  console.log("idUser======", idUserCreate);

  // gọi dữ liệu API lấy image by Id
  useEffect(() => {
    const fetchImageById = async (id: number) => {
      try {
        const response = await ImageAPI.getImageById(id);
        setImageChoice(response.data.data);
      } catch (error) {
        console.error("Error retrieving data: ", error);
      }
    };
    if (isChoiceImg) {
      fetchImageById(numberId);
    }
    return () => {
      setIsChoiceImg(false);
    };
  }, [isChoiceImg]);

  console.log("Image đang chọn====>", imageChoice);

  // gọi dữ liệu API users
  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await UserAPI.getUsers();
        setUserList(response.data.data);
      } catch (error) {
        console.error("Error retrieving data: ", error);
      }
    };
    if (isCallUser) {
      fetchDataUser();
    }
    return () => {
      setIsCallUser(false);
    };
  }, [isCallUser]);

  console.log("userList====>", userList);

  // gọi dữ liệu API images
  const fetchDataImage = async () => {
    try {
      const response = await ImageAPI.getAllImages_Comments();
      console.log(2222, response);
      setImageList(response.data.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    fetchDataImage();
  }, [dataUpdateName]);

  const fetchUserFollowed = async (id: number) => {
    try {
      const response3 = await FollowAPI.getUserFollowed(id);
      // const response1 = await FollowAPI.getUserFolloweOther(id);
      setUserFollowed(response3.data.data);
      console.log("object6666", response3);

      // setUserFollowOther(response1.data.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    fetchUserFollowed(idUserCreate);
  }, [idUserCreate]);
  console.log("setUserFollowed", userFollowed);
  console.log("usersCreateImage", usersCreateImage[0]?.idUser);

  const commentList = imageList.filter(
    (Comment) => Comment.imageCommentId === numberId
  );
  console.log("commentList", commentList);

  // gọi dữ liệu API Comment lấy số lượt yêu thích "Love", "Like"
  const fetchDataComment = async () => {
    try {
      const response1 = await CommentAPI.getLoveComments();
      const response2 = await CommentAPI.getLikeComments();
      const response3 = await CommentAPI.getAllComments();
      console.log("loveComment====>", response1.data.data);
      console.log("likeComment====>", response2.data.data);
      console.log("AllComment====>", response3.data.data);
      setLoveCommentList(response1.data.data);
      setLikeCommentList(response2.data.data);
      setAllCommentList(response3.data.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    fetchDataComment();
    if (isComment) {
      fetchDataComment();
    }
    return () => {
      setIsComment(false);
    };
  }, [isComment]);

  // gọi dữ liệu API Follow lấy số lượt follow
  useEffect(() => {
    const fetchDataFollow = async () => {
      try {
        const response = await FollowAPI.getAllFollow_User();
        console.log("followUser====>", response.data.data);
        setFollowUserList(response.data.data);
      } catch (error) {
        console.error("Error retrieving data: ", error);
      }
    };
    if (isFollow) {
      fetchDataFollow();
    }
    return () => {
      setIsFollow(false);
    };
  }, [isFollow]);

  const fetchLoveImage = async () => {
    try {
      const response1 = await ImageAPI.getAllImages_Love();
      const response2 = await ImageAPI.getAllImages_Like();
      console.log("Love Image====>", response1.data.data);
      console.log("Like Image====>", response2.data.data);
      setLoveImageList(response1.data.data);
      setLikeImageList(response2.data.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  // gọi dữ liệu API Image lấy số lượt LOVE, LIKE ảnh
  useEffect(() => {
    if (isOperation) {
      fetchLoveImage();
    }
    return () => {
      setIsOperation(false);
    };
  }, [isOperation]);

  const arrLoveByImage = loveImageList.filter(
    (item) => item.idImage === numberId
  );
  const arrLikeByImage = likeImageList.filter(
    (item) => item.idImage === numberId
  );
  console.log("arrLoveImage===>", arrLoveByImage);
  console.log("arrLikeImage===>", arrLikeByImage);

  const countLikeImage = arrLikeByImage.length;
  const countLoveImage = arrLoveByImage.length;

  const countLikeLoveImage = countLikeImage + countLoveImage;
  console.log("countLikeLoveImage", countLikeLoveImage);

  // tìm idUser đã tạo ra ảnh đang xem
  const findUserCreateImage = followUserList.find(
    (item) => item.idImage == numberId
  );
  console.log("findUserCreateImagend", findUserCreateImage?.idUser);
  // đếm số lượt được follow của user này
  const countFollowUser = followUserList.filter(
    (item) => item.idUser === findUserCreateImage?.idUser
  ).length;
  console.log("countFollowUser", countFollowUser);

  const imageViewDetail = imageList.find(
    (image) => image.idImage === numberId
  );
  console.log("imgList", imageList);

  const [comment, setComment] = useState("");

  // Đếm số lượng Love của từng comment trong commentList
  const loveByCommentList = commentList?.map(
    (comment) =>
      loveCommentList?.filter(
        (love) => love.idComment == comment.idComment
      ).length
  );
  console.log(loveByCommentList);
  // tạo ra mảng gồm danh sách các user thích comment đang tương tác
  const arrUserloveComment = commentList?.map((comment) =>
    loveCommentList?.filter(
      (item) => item.idComment === comment.idComment
    )
  );
  console.log("Arr user love comment", arrUserloveComment);

  console.log("Dem love của từng comment", loveByCommentList);
  console.log("all comment===>", allCommentList);

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (comment.trim() !== "") {
      const newComment = {
        imageCommentId: imageChoice[0].idImage,
        userCommentId: userLogin?.idUser,
        content: comment,
        timecreate: new Date().toISOString().split("T")[0],
      };

      await CommentAPI.postComment(newComment)
        .then((response) => {
          console.log("Comment sent successfully:", response.data);
          // update lại dữ liệu từ DB
          // ------------------------------------?
          fetchDataImage();
          setComment("");
        })
        .catch((error) => {
          // Xử lý khi gửi bình luận gặp lỗi
          console.error("Error sending comment:", error);
        });
    }
  };

  // đếm số lượng nhận xét của ảnh được chọn
  const countComments = imageList?.filter(
    (imageJoinComment) => imageJoinComment.imageCommentId === numberId
  );
  console.log("countComments", countComments.length);
  // đếm số lượng tim yêu thích của từng comment

  const handleHeartClick = async (id: number) => {
    const commentHeart = imageList?.find(
      (imageJoinComment) => imageJoinComment.idComment === id
    );
    console.log("comment click ====>", commentHeart);
    console.log("Id comment ====>", id);

    // gọi bảng like_love_comment về
    const fetchLikeLoveComment = async () => {
      try {
        const response = await CommentAPI.getLikeLoveComments();
        setLikeLoveComment(response.data.data);
      } catch (error) {
        console.error("Error retrieving data: ", error);
      }
    };

    fetchLikeLoveComment();
    console.log(66666, likeLoveComment);
    const findComment = likeLoveComment?.filter(
      (item) =>
        item.commentLikeLoveId === id &&
        item.userLoveCommentId === userLogin?.idUser
    );
    console.log(777, findComment);
    if (findComment?.length > 0) {
      // console.log(888, "đã thả tim rồi thì xoá tim đi");
      const handleDeleteLikeAtComment = async (id: number) => {
        try {
          await CommentAPI.deleteLikeAtComment(id);
          // Xoá thành công, tiến hành tải lại danh sách blog
        } catch (error) {
          console.error("Error deleting blog: ", error);
        }
      };
      const idDeleteLike = findComment[0]?.idLikeLoveComment;
      console.log(99, idDeleteLike);
      handleDeleteLikeAtComment(idDeleteLike);
      fetchDataComment();
      fetchDataImage();
    } else {
      // console.log(888, "chưa thả tim thì add tim vào");

      const newLikeComment = {
        commentLikeLoveId: id,
        userLikeCommentId: null,
        userLoveCommentId: userLogin?.idUser,
      };
      console.log(1010, newLikeComment);
      await CommentAPI.postLikeAtComment(newLikeComment)
        .then((response) => {
          console.log(
            "like comment add successfully:",
            response.data
          );
          fetchDataComment();
          fetchDataImage();
        })
        .catch((error) => {
          // Xử lý khi gửi bình luận gặp lỗi
          console.error("Error sending comment:", error);
        });
    }
  };
  // kiểm tra ảnh đang xem đã được lưu chưa
  let isSaved = false;

  const handleSaveImage = async () => {
    // nếu trạng thái chưa lưu thì lưu ảnh vào bảng images_saved_user tại DB
    if (!imageStoreSaved) {
      const newSaveImg = {
        imageSavedId: numberId,
        userSavedId: Number(userLogin?.idUser),
      };
      await ImageAPI.postImageSaved(newSaveImg)
        .then((response) => {
          console.log("Save add successfully:", response.data);
          fetchImageSaved();
        })
        .catch((error) => {
          console.error("Error save iamge:", error);
        });
    } else {
      const findArrSaveImage = imageSaved.find(
        (item) =>
          item.imageSavedId === numberId &&
          item.userSavedId === userLogin?.idUser
      );
      const findIdSaveImage = findArrSaveImage?.idSaveImage;
      console.log(555555555555, findIdSaveImage);
      // Xoá ảnh trong images_saved_user tại dòng có idSaveImage=findIdSaveImage
      const handleDeleteImage = async (id: number) => {
        try {
          await ImageAPI.deleteImageById(id);
          // Xoá thành công, tiến hành tải lại danh sách blog
        } catch (error) {
          console.error("Error deleting blog: ", error);
        }
      };
      if (typeof findIdSaveImage === "number") {
        handleDeleteImage(findIdSaveImage);
      }
      fetchImageSaved();
    }

    // nếu ảnh chưa lưu thì add ảnh vào API, ngược lại thì không
    if (!isSaved) {
    }
  };

  // Xử lý biểu tượng cảm xúc hình ảnh
  const [showIcons, setShowIcons] = useState(false);
  const [chooseIcon, setChooseIcon] = useState<JSX.Element | null>(
    null
  );
  const handleMouseOver = () => {
    setShowIcons(true);
  };
  const handleMouseOut = () => {
    setShowIcons(false);
  };
  // lấy dư liệu bảng operation image
  const fetchOperationImage = async () => {
    try {
      const response = await ImageAPI.getOperationImage();
      console.log(
        "getOperationImage successfully:",
        response.data.data
      );
      setOperationImage(response.data.data);
    } catch (error) {
      console.error("Error get OperationImage:", error);
    }
  };
  useEffect(() => {
    fetchOperationImage();
  }, []);

  const handleIconClick = async (icon: string) => {
    // Xử lý khi người dùng chọn biểu tượng
    console.log("operationImage:", operationImage);
    let findArrLoveImage = operationImage?.filter(
      (item) =>
        item.imageOperationId == numberId &&
        item.userLoveImageId == userLogin?.idUser
    );
    let findArrLikeImage = operationImage?.filter(
      (item) =>
        item.imageOperationId == numberId &&
        item.userLikeImageId == userLogin?.idUser
    );
    console.log("findArrLoveImage", findArrLoveImage);
    console.log("findArrLikeImage", findArrLikeImage);
    if (icon == "heart") {
      setChooseIcon(<BiSolidHappyHeartEyes />);
      if (findArrLoveImage?.length > 0) {
        // xoá love Image
        const DeleteLoveImage = async (id: number) => {
          try {
            await ImageAPI.deleteLoveImage(id);
            fetchLoveImage();
          } catch (error) {
            console.error("Error retrieving data: ", error);
          }
        };
        if (
          typeof findArrLoveImage[0]?.idOperationImage === "number"
        ) {
          DeleteLoveImage(findArrLoveImage[0]?.idOperationImage);
        }
        fetchOperationImage();
      }
      //  nếu chưa có thì add love image vào
      else {
        const newLoveImage = {
          imageOperationId: numberId,
          userLikeImageId: null,
          userLoveImageId: userLogin?.idUser,
          userSavedImageId: null,
        };
        const handlePostLoveImage = async (
          newLoveImage: ILikeLoveImage
        ) => {
          try {
            const response2 = await ImageAPI.postLoveImage(
              newLoveImage
            );
            console.log("response Post", response2.data.data);
            fetchLoveImage();
          } catch (error) {
            console.error("Error retrieving data: ", error);
          }
        };
        handlePostLoveImage(newLoveImage);
        fetchOperationImage();
      }
    } else {
      // Xử lý khi chọn biểu tượng cảm ơn
      setChooseIcon(<MdTagFaces />);

      if (findArrLikeImage?.length > 0) {
        // xoá like Image
        const DeleteLikeImage = async (id: number) => {
          try {
            await ImageAPI.deleteLoveImage(id);
            fetchLoveImage();
          } catch (error) {
            console.error("Error retrieving data: ", error);
          }
        };
        if (
          typeof findArrLikeImage[0]?.idOperationImage === "number"
        ) {
          DeleteLikeImage(findArrLikeImage[0]?.idOperationImage);
        }
        fetchOperationImage();
      }
      //  nếu chưa có thì add love image vào
      else {
        const newLikeImage = {
          imageOperationId: numberId,
          userLikeImageId: userLogin?.idUser,
          userLoveImageId: null,
          userSavedImageId: null,
        };
        const handlePostLikeImage = async (
          newLikeImage: ILikeLoveImage
        ) => {
          try {
            const response2 = await ImageAPI.postLoveImage(
              newLikeImage
            );
            console.log("response Post", response2.data.data);
            fetchLoveImage();
          } catch (error) {
            console.error("Error retrieving data: ", error);
          }
        };
        handlePostLikeImage(newLikeImage);
        fetchOperationImage();
      }
    }
  };

  const [showRenderUserOperation, setShowRenderUserOperation] =
    useState(false);
  const renderUserOperationRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        renderUserOperationRef.current &&
        !renderUserOperationRef.current.contains(event.target)
      ) {
        setShowRenderUserOperation(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleViewDetail = () => {
    setShowRenderUserOperation(true);
  };

  const fetchUserFollowOther = async (id: number) => {
    try {
      const response = await FollowAPI.getUserFolloweOther(id);
      setUserFollowOthers(response.data.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    // fetchUserFollowOther(usersCreateImage[0]?.idUser);
    fetchUserFollowOther(userLogin?.idUser);
  }, []);

  userFollowOthers.filter(
    (item) => item.userFollowedbyId === usersCreateImage[0]?.idUser
  );

  const ListFollowedbyUserLogin = userFollowOthers.filter(
    (item) => item.userFollowedbyId === usersCreateImage[0]?.idUser
  );
  console.log("222222", ListFollowedbyUserLogin);
  const handleFollowUserCreatedImg = () => {
    if (ListFollowedbyUserLogin.length > 0) {
      // Bỏ theo dõi
      const deleteFollowed = async (id: number) => {
        try {
          await FollowAPI.deleteFollowed(id);
        } catch (error) {
          console.error("Error retrieving data: ", error);
        }
      };
      if (typeof ListFollowedbyUserLogin[0].idFollow === "number") {
        deleteFollowed(ListFollowedbyUserLogin[0].idFollow);
      }
      fetchUserFollowOther(userLogin?.idUser);
      fetchUserFollowed(idUserCreate);
      setStatusFollow(!statusFollow);
    }
    // add theo theo dõi vào bảng follows
    else {
      const newFollow = {
        userFollowedbyId: usersCreateImage[0]?.idUser,
        userFollowOtherId: Number(userLogin?.idUser),
      };
      const handleAddFolowed = async (newFollow: IFollow) => {
        try {
          await FollowAPI.addFollowed(newFollow);
        } catch (error) {
          console.error("Error retrieving data: ", error);
        }
      };
      handleAddFolowed(newFollow);
      fetchUserFollowOther(userLogin?.idUser);
      fetchUserFollowed(idUserCreate);
      setStatusFollow(!statusFollow);
    }
  };

  const handleDetailUserCreateImage = () => {
    navigate(`/profile/${idUserCreate}`);
  };

  return (
    <Container id="wrap-detail">
      <div id="left-area">
        <img
          src={imageChoice[0]?.linkImage}
          alt="detail image"
          id="img-detail"
        />
      </div>
      <div id="right-area">
        <div id="right-area-top">
          <div id="top-right">
            <div id="document-save">
              <div id="id-document">
                <span>Hồ sơ </span>
                <IoIosArrowDown />
              </div>
              <div>
                <button
                  id="id-save"
                  onClick={() => handleSaveImage()}
                  className={imageStoreSaved ? "saved" : ""}
                >
                  {imageStoreSaved ? "Đã lưu" : "Lưu"}
                </button>
              </div>
            </div>
            <div>
              <BsThreeDots id="id-dot" />
            </div>
          </div>
          <div id="userCreate-follow">
            <div id="userCreate-follow-left">
              <div id="avatar-create-img">
                <img src={usersCreateImage[0]?.avatarUser} alt="" />
              </div>
              <div id="username-count-follow">
                <span
                  id="sp-username"
                  onClick={handleDetailUserCreateImage}
                >
                  {usersCreateImage[0]?.username}
                </span>
                <span>{userFollowed?.length} người theo dõi</span>
              </div>
            </div>
            <div id="userCreate-follow-right">
              <button
                id="btn-follow"
                onClick={handleFollowUserCreatedImg}
                className={
                  ListFollowedbyUserLogin.length > 0 ? "saved" : ""
                }
              >
                {ListFollowedbyUserLogin.length > 0
                  ? "Đã theo dõi"
                  : "Theo dõi"}
              </button>
            </div>
          </div>
          <p id="id-source-img">
            <u>{imageViewDetail?.sourceImage}</u>
          </p>

          <h5 id="id-title-image">{imageViewDetail?.titleImage}</h5>
          <p id="id-descrip-img">{imageViewDetail?.description}</p>
          <br />
          <p id="id-count-comment">
            <h5>
              <span>{countComments.length} </span>{" "}
              <span>Nhận xét</span>{" "}
              <IoIosArrowDown id="id-arrowdown" />
            </h5>
          </p>
          <div className="wrapper-comments">
            {commentList &&
              commentList.map((comment, index) => {
                return (
                  <div className="show-comment" key={index}>
                    <div className="avatar-comment">
                      {userLogin?.avatarUser == null ? (
                        <img
                          src="https://cdn.onlinewebfonts.com/svg/img_542942.png"
                          alt="avatar"
                        />
                      ) : (
                        <img
                          src={userLogin?.avatarUser}
                          alt="avatar"
                        />
                      )}

                      {/* <img src={comment.avatarUser} alt="" /> */}
                    </div>
                    <div className="view-comment">
                      <div>
                        <b>{comment.username}</b>
                        <span className="content-comment">
                          {comment.content}
                        </span>
                      </div>
                      <div className="action-comment">
                        <span>{comment.timecreate.slice(0, 10)}</span>
                        <span className="ans-comment">Trả lời</span>
                        <span className="ans-heart">
                          {/* đếm số lượt yêu thích */}
                          {loveByCommentList[index] > 0 ? (
                            <AiFillHeart
                              id="id-heart"
                              onClick={() =>
                                handleHeartClick(comment.idComment)
                              }
                              className={
                                loveByCommentList[index] > 0
                                  ? "active"
                                  : ""
                              }
                            />
                          ) : (
                            <AiOutlineHeart
                              id="id-heart"
                              onClick={() =>
                                handleHeartClick(comment.idComment)
                              }
                            />
                          )}

                          {/* ------------------------------------------------------- */}
                          <div id="wrap-love-comment">
                            <span id="count-love-coment">
                              {" "}
                              {loveByCommentList[index] > 0
                                ? loveByCommentList[index]
                                : ""}
                            </span>
                            <div className="show-user-love">
                              {loveByCommentList[index] > 0 &&
                                arrUserloveComment[index]?.map(
                                  (userlove) => {
                                    return (
                                      <div
                                        className="row-mini-love"
                                        key={userlove.idComment}
                                      >
                                        <div>
                                          <span>
                                            <img
                                              src={
                                                userlove.avatarUser
                                              }
                                              alt=""
                                            />
                                          </span>
                                          <span className="name-uselove">
                                            {userlove.username}
                                          </span>
                                        </div>
                                        <div>
                                          <AiFillHeart className="heart-userlove" />
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                            </div>
                          </div>

                          {/* ------------------------------------------------------- */}
                        </span>
                        <span>
                          <BsThreeDots id="id-dots" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div id="right-area-bottom">
          {/* <hr /> */}
          <div id="you-think">
            <span style={{ fontWeight: 600 }}>Bạn nghĩ gì?</span>

            <div className="emotion-image">
              <div className="icon-count">
                <div className="icon-users">
                  {countLikeImage > 0 ? <MdTagFaces /> : ""}
                  {countLoveImage > 0 ? (
                    <BiSolidHappyHeartEyes />
                  ) : (
                    ""
                  )}
                </div>
                <div className="count-icon-users">
                  <span
                    className="number-operation"
                    onClick={handleViewDetail}
                  >
                    {countLikeLoveImage > 0 ? countLikeLoveImage : ""}
                  </span>
                  {showRenderUserOperation && (
                    <div className="overlay">
                      <div
                        ref={renderUserOperationRef}
                        className="render-user-operation"
                      >
                        <p>
                          <BiSolidHappyHeartEyes className="biso-heart" />
                          <MdTagFaces className="tag-face" />
                        </p>
                        <div className="row-render-user">
                          {arrLoveByImage?.map((userLoveImage) => {
                            return (
                              <div
                                key={userLoveImage.idImage}
                                className="wrap-row"
                              >
                                <div className="avatar-name">
                                  <span>
                                    <img
                                      src={userLoveImage.avatarUser}
                                      alt=""
                                    />
                                  </span>
                                  <span className="cl-nameuser">
                                    {userLoveImage.username}
                                  </span>
                                </div>
                                <div>
                                  <BiSolidHappyHeartEyes className="biso-heart1" />
                                </div>
                              </div>
                            );
                          })}
                          {arrLikeByImage?.map((userLikeImage) => {
                            return (
                              <div
                                key={userLikeImage.idImage}
                                className="wrap-row"
                              >
                                <div className="avatar-name">
                                  <span>
                                    <img
                                      src={userLikeImage.avatarUser}
                                      alt=""
                                    />
                                  </span>
                                  <span className="cl-nameuser">
                                    {userLikeImage.username}
                                  </span>
                                </div>
                                <div>
                                  <MdTagFaces className="biso-heart2" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div id="wrap-heart">
                <CgHeart className="emotion-icon" />
                <div className="emotion-icons">
                  <div className="heart-icon">
                    <b>Thích</b>
                    <BiSolidHappyHeartEyes
                      style={{ width: "40px", height: "40px" }}
                      onClick={() => handleIconClick("heart")}
                    />
                  </div>
                  <div className="thank-icon">
                    <b>Cảm ơn</b>
                    <MdTagFaces
                      style={{ width: "40px", height: "40px" }}
                      onClick={() => handleIconClick("thank")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="bottom-comment">
            {userLogin?.avatarUser == null ? (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                alt="avatar"
                id="avatar-comment"
              />
            ) : (
              <img
                src={userLogin?.avatarUser}
                alt="avatar"
                id="avatar-comment"
              />
            )}
            <input
              type="text"
              placeholder="Thêm nhận xét"
              id="add-content-comment"
              value={comment}
              onChange={handleCommentChange}
            />
            <button
              style={{ border: "none", backgroundColor: "white" }}
              onClick={handleAddComment}
            >
              <MdOutlineSend id="btn-add-comment" />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DetailImage;
