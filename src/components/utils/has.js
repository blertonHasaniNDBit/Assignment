const has = (array) => {
    return array !== null && array !== undefined && Array.isArray(array) && array.length > 0;
};

export default  has