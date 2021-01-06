const numberWithCommas = (number) => {
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'Unknown';
};

export default numberWithCommas;