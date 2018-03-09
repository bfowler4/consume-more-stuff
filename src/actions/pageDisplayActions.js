export const SET_PAGE_TO_DISPLAY = `SET_PAGE_TO_DISPLAY`;

export const setPageToDisplay = currentPage => {
  return {
    type: SET_PAGE_TO_DISPLAY,
    page: currentPage
  }
}