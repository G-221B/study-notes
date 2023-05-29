// 选择排序：顾名思义，每次选择最小的，将最小值放到数组的最前面，后续再继续遍历寻找
function sortArr(nums) {
    for(let i = 0; i < nums.length; i++) {
        let index = i;
        for(let j = i + 1; j < nums.length; j++) {
            if(nums[index] > nums[j]) {
                index = j;
            }
        }
        if(index !== i) {
            [nums[i], nums[index]] = [nums[index], nums[i]];
        }
    }
    return nums;
}

console.log(sortArr([21,3,2,123,43,32,54,34,22,55,11,42,322]))