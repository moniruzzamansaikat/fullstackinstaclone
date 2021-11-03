const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  photos: [],
  uploadingPhotos: false,
  uploadingStory: false,
};

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setPhotos: (state, { payload }) => {
      state.photos = payload;
    },

    removePhoto: (state, { payload }) => {
      state.photos = state.photos.filter((photo) => photo.id !== payload);
    },

    setUploadingPhotos: (state, { payload }) => {
      state.uploadingPhotos = payload;
    },
  },
});

export const { setPhotos, setUploadingPhotos, removePhoto } =
  photosSlice.actions;
export default photosSlice.reducer;
