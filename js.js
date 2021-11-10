var findLucky = function (arr) {
  const objs = {};
  const rvs = arr.sort((a, b) => a - b).reverse();
  for (let i = 0; i < arr.length; i++) {
    if (typeof objs[arr[i]] === "undefined") {
      const obj = {
        value: arr[i],
        count: 1,
      };
      objs[arr[i]] = obj;
    } else {
      objs[arr[i]] = {
        ...objs[arr[i]],
        count: objs[arr[i]].count + 1,
      };
    }
  }

  const entries = Object.entries(objs);

  return mx(entries);
};

function mx(arr) {
  let m = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][1].count > m[1].count) m = arr[i];
  }

  if (+m[0] === m[1].count) {
    return m[0];
  }

  return -1;
}

console.log(findLucky([2, 2, 2, 3, 3]));

var calPoints = function (ops) {
  let calc = 0;
  let nums = [];

  ops.forEach((value, index, arr) => {
    let len = nums.length;

    if (value === "+") {
      calc += nums[len - 1] + nums[len - 2];
      nums.push(calc);
    } else if (value === "C") {
      nums.pop();
    } else if (value === "D") {
      nums.push(nums[len - 1] * 2);
    } else {
      let number = +value;
      nums.push(number);
    }
  });

  return nums.reduce((prev, curr) => prev + curr, 0);
};
