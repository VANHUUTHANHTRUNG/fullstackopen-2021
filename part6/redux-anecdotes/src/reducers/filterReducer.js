const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'MODIFY':
      return action.data.filter
    default:
      return state
  }
}

export const modifyFilter = (filter) => {
  return {
    type: 'MODIFY',
    data: { filter },
  }
}

export default filterReducer
