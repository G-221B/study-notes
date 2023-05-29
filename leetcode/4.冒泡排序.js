// 冒泡排序：每次和i下标比较，当前如果有比i下标小的，直接冒泡到i下标
function sortArr(nums) {
    for(let i = 0; i < nums.length; i++) {
        for(let j = i+1; j < nums.length; j++) {
            if(nums[i] > nums[j]) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
            }
        }
    }
    return nums;
}

console.log(sortArr([21,3,2,123,43,32,54,34,22,55,22,11,42,322]))