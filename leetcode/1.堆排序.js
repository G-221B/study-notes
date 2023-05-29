// 堆排序: 创建一个最大堆后，依次将首位和末尾位互换，重新对首位进行最大堆填充
// 最大堆：最大堆其实就是个特别的二叉树，父节点的value需要比左右节点大
function sortArr(nums) {
    createMaxHeap(nums);
    console.log(nums)
    const size = nums.length;
    for(let i = size - 1; i >= 0; i--) {
        [nums[i], nums[0]] = [nums[0], nums[i]];
        maxHeap(nums, 0, i)
    }
    function createMaxHeap(nums) {
        const size = nums.length;
        for(let i = Math.floor(size / 2); i >= 0; i--) {
            maxHeap(nums, i, size);
        }
    }
    function maxHeap(nums, index, size) {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let rootIndex = index;
        if(left < size && nums[left] > nums[rootIndex] ) {
            rootIndex = left;
        }
        if(right < size && nums[right] > nums[rootIndex]) {
            rootIndex = right;
        }
        if(rootIndex !== index) {
            [nums[rootIndex], nums[index]] = [nums[index], nums[rootIndex]];
            maxHeap(nums, rootIndex, size);
        }
    }
    return nums;
}

console.log(sortArr([
    322, 123, 54, 34, 55, 42,
     21,   3, 22, 43, 22, 11,
     32,   2
  ]))
