# REDUX FROM SCRATCH

## PROS

  * Predictable State Changes
  * Centralized State
  * Easy Debugging
  * Preserve Page State
  * Undo/Redo
  * Ecosystem of Add-Ons

## CONS

  * Complexity
  * Verbosity

### WHEN NOT TO USE

  * Tight Budget
  * Small to Medium-Size Apps
  * Simple UI/Data Flow
  * Static Data

## PURE FUNCTIONS

### CONCEPTS

  * Same params should return same result
  * No Random Values
  * No Current date/time
  * No global state
  * No mutation of parameters

### BENEFITS

  * Self-Documentating
  * Easily Testable
  * Concurrency
  * Cacheable

## IMMUTABILITY

### CONCEPTS

  * Functions Should Return a new object/value
  * Params/Arguments Shouldn't be reassigned or changed

### BENEFITS

  * Predictability
  * Faster Change Detection
  * Concurrency

### CONS

  * Performance
  * Memory Overhead

## STEPS TO CREATE A REDUX STRUCTURE

  * Design the store
  * Define the actions
  * Create a Reducer
  * Setup the store

## ANNOTATIONS

  * **RES:** Redux Everywhere Syndrome
  * [Dam Abramov - You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
  * An ACTION can be also called as EVENT
  * A REDUCER can be also called as EVENT HANDLER
  * The STORE is responsible to call the REDUCER

## ORIGINAL CONTENT FROM

  * YouTube Channel: [Programming with Mosh](https://www.youtube.com/channel/UCWv7vMbMWH4-V0ZXdmDpPBA)
  * Video: [Redux Tutorial - Learn Redux from Scratch](https://www.youtube.com/watch?v=poQXNp9ItL4)