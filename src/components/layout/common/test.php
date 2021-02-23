<?php
//////////////////////////////////
// Factory
//////////////////////////////////


interface FriendFactoryInterface {
    public function create() : Friend;
}


class FriendFactory implements FriendFactoryInterface {
    public function create() : Friend {
        
        $friend = new Friend();
        // initialize your friend
        return $friend;
    }
}



//////////////////////////////////
// Strategy
//////////////////////////////////

interface ReaderInterface { 
    public function start() : void;
    public function read() : array;
    public function stop() : void;
}
interface WriterInterface {
   public function start() : void;
   public function write(array $data) : void;
   public function stop() : void;
}
class DatabaseReader implements ReaderInterface {
    
}
class SpreadsheetReader implements ReaderInterface {
    
}
class CsvWriter implements WriterInterface {
    
}
class JsonWriter implements WriterInterface {
    
}
class Transformer {
    
    
    public function transform(string $from, string $to) : void {
        $reader = $this->findReader($from);
        $writer = $this->findWriter($to);
        
        $reader->start();
        $writer->start();
        try {
            foreach ($reader->read() as $row) {
                $writer->write($row);
            }
         } finally {
             $writer->stop();
             $reader->stop();
         }
     }
     
}