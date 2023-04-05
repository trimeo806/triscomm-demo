import React, { useEffect } from "react";
import { Card, Container } from "@mui/material";
import Profile from "../features/user/Profile";
import ProfileCover from "../features/user/ProfileCover";
import { useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import LoadingScreen from "../components/LoadingScreen";

function UserProfilePage() {
  const params = useParams();
  const userId = params.userId;
  const dispatch = useDispatch();
  const { selectedUser, isLoading } = useSelector(
    (state) => state.user,
    //shallow Equal cho phep render lai mac du chi nhung gia tri ben trong object thay doi
    // Tai vi khi ben trong object thay doi thi reference cua object khong thay doi. Co the React khong nhan ra
    // Nen ta dung shallowEqual de dam bao key value ben trong object thay doi thi react cung render lai luon
    shallowEqual
  );

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [dispatch, userId]);

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Card
            sx={{
              mb: 3,
              height: 280,
              position: "relative",
            }}
          >
            {selectedUser && <ProfileCover profile={selectedUser} />}
          </Card>
          {selectedUser && <Profile profile={selectedUser} />}
        </>
      )}
    </Container>
  );
}

export default UserProfilePage;
