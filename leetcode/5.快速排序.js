// 快速排序: 找个中间值，比他大的在右边，比他小的在左边。然后递归，递归到length <= 1；
function sortArr(nums) {
    if(nums.length <= 1) {
        return nums;
    }
    const len = nums.length;
    const randomIndex = Math.floor(Math.random() * len);
    let random = nums[randomIndex];
    let i = 0;
    const left = [];
    const right = [];
    const middle = [];
    while(i < len) {
        if(nums[i] < random) {
            left.push(nums[i]);
        } else if (nums[i] === random) {
            middle.push(nums[i])
        } else {
            right.push(nums[i]);
        }
        i++;
    }
    return [...sortArr(left), ...middle, ...sortArr(right)]
}

console.log(sortArr([21,3,2,123,43,32,54,34,22,55,22,11,42,322]))