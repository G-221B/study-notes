// 归并排序: 将数据分成两半，分到不能再分，再两两排序，再一层层排序合并
function sortArr(nums) {
    if(nums.length <= 1) {
        return nums;
    }
    let res = [];
    const len = nums.length;
    const middle = Math.floor(len / 2);
    let left = sortArr(nums.slice(0, middle))
    let right = sortArr(nums.slice(middle, len));
    let i = 0, 
        j = 0;
    while(i < left.length && j < right.length) {
        if(left[i] < right[j]) {
            res.push(left[i]);
            i++;
        } else {
            res.push(right[j]);
            j++;
        }
    }
    if(i < left.length) {
        res = [...res, ...left.slice(i, left.length)];
    }
    if(j < right.length) {
        res = [...res, ...right.slice(j, right.length)];
    }
    return res;
}

console.log(sortArr([21,3,2,123,43,32,54,34,22,55,22,11,42,322]))