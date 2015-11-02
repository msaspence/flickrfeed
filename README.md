# flickrfeed

Demonstration of Flickrs API using React

## Demonstration

http://flickrfeed.msaspence.com

## Usage

### Install

```
git clone https://github.com/msaspence/flickrfeed.git
npm install
```

### Running

```
npm start
```

### Testing

```
npm test
```

To run a subset of tests:

```
gulp test -t path/to/test
```

## Assumptions

  * Search takes:
    * text
    * tags in the form `tag:mytag`
    * tags can be mixed in with text `my tag:tag1 search tag:tag2 query`
    * owner in the form `owner:1234567890@N01`
    * owner can be mixed in with text and tags
    * if more than one owner is provided the first is used
  * Fixed height on photo cards means
    * titles are limited to 2 lines
    * tags are limited to 3 lines
    * description is limited to 4 lines
    * there is not indication that these have been cropped in the UI
  * Photo loading
    * photos are loaded in batches of 18
    * the next 6 batches following the one one screen are prefetched
    * actual image files are lazy loaded if the photo is within 1000px of the visible screen

## What next

### Technology

 * Flux - Look at implementing Flux rather than passing searchQuery and setSearchQuery down the tree
 * Continous Integration - automated cross browser testing with Testling
 * Use Reach's shouldComponentUpdate to improve performance
 * Protect my Flickr API key
 * Work out asyncronous gulp order and dependencies


### Features

 * Large in app views of pictures rather than linking to Flickr
 * Scalable infinite scroll that removes previously view photos from the DOM
 * Better responsive styles for mobile
 * Cache results

