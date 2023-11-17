export class RangeList {
    private ranges: Array<[number, number]> = [];
  
    /**
     * Adds a new range to the Range List.
     * @param {Array<number>} range - An array representing the start and end of the range.
     */
    add(range: [number, number]) {
        let [start, end] = range;
    
        if (start >= end) {
            return;
        }
    
        // Merge overlapping or adjacent ranges
        let i = 0;
        // Find index of range to start the change
        while (i < this.ranges.length && this.ranges[i][1] < start) {                                //      | This one 
            // return first range where the end of the existing range is > start of new range. e.g [0,5) [10,12) [20, 30) add [6, 18)
            i++;
        }
    
        while (i < this.ranges.length && this.ranges[i][0] <= end) {
            // Merge overlapping or adjacent ranges.
            start = Math.min(this.ranges[i][0], start);
            end = Math.max(this.ranges[i][1], end);
            this.ranges.splice(i, 1); // Remove the merged range.
        }
    
        this.ranges.splice(i, 0, [start, end]); // Insert the new merged range.
    }
  
    /**
 * Removes a range from the Range List.
 * @param {Array<number>} range - An array representing the start and end of the range to be removed.
 */
    remove(range: [number, number]) {
        let [start, end] = range;
    
        // Ignore invalid ranges where start is greater than or equal to end.
        if (start >= end) {
        return;
        }
    
        let i = 0;
        while (i < this.ranges.length && this.ranges[i][1] <= start) {
        // Skip ranges that end before or at the start of the range to be removed.
        i++;
        }
    
        while (i < this.ranges.length && this.ranges[i][0] < end) {
        const currStart = this.ranges[i][0];
        const currEnd = this.ranges[i][1];
    
        // Adjust the current range's end if it overlaps with the start of the range to be removed.
        if (currStart < start) {
            this.ranges[i][1] = start;
        }
    
        // Insert a new range for the non-overlapping part of the current range.
        if (currEnd > end) {
            this.ranges.splice(i + 1, 0, [end, currEnd]);
        }
    
        // Check and remove the current range if it overlaps with the range to be removed.
        let newCurrEnd = this.ranges[i][1];
        if (newCurrEnd > start) {
            this.ranges.splice(i, 1);
        } else {
            i++;
        }
        }
    }
  
    toString() {
      return this.ranges.map(range => `[${range[0]}, ${range[1]})`).join(' ');
    }
  }  