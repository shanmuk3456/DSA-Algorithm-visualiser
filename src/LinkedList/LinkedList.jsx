import TheoryPageHeader from "../components/TheoryPageHeader";
import "../Array/array.css";

function LinkedList() {
  return (
    <>
      <div className="logo-part">DSA Visualizer</div>

      <div className="mainbox">
        <TheoryPageHeader
          title="Singly Linked List"
          to="/linked-list/visualizer"
        />

        <div className="def">
          <div className="d1">Definition</div>
          <div className="d2">
            A linked list is a linear data structure consisting of nodes.
            Each node contains data and a pointer to the next node.
          </div>
        </div>

        <br />

        <div className="def">
          <div className="d1">Operations</div>
          <div className="d2">
            Insert at Beginning
            <br />
            Insert at End
            <br />
            Insert at Position
            <br />
            Delete at Beginning
            <br />
            Delete at End
            <br />
            Delete at Position
            <br />
            Search
            <br />
            Display
          </div>
        </div>

        <br />

        <div className="def">
          <div className="d1">Advantages</div>
          <div className="d2">
            Dynamic size, efficient insertions and deletions, no memory wastage.
          </div>
        </div>

        <br />

        <div className="def">
          <div className="d1">Disadvantages</div>
          <div className="d2">
            Extra memory required for pointers and sequential access only.
          </div>
        </div>
        <br />


        <div className="def">
          <div className="d1">Basic C Code</div>

          <div className="d2">
            <pre>
              <code>{`#include<stdio.h>
#include<stdlib.h>

struct Node{
    int data;
    struct Node* next;
};

void display(struct Node* head){
    while(head!=NULL){
        printf("%d ",head->data);
        head=head->next;
    }
}

int main(){

    struct Node* head=NULL;

    struct Node* n1=
      (struct Node*)malloc(sizeof(struct Node));

    n1->data=10;
    n1->next=NULL;

    head=n1;

    display(head);

    return 0;
}`}</code>
            </pre>
          </div>
        </div>

        <br />

        <div className="def">
          <div className="d1">Time Complexity</div>

          <div className="d2">
            Insert Beginning : O(1)
            <br />
            Insert End : O(n)
            <br />
            Delete Beginning : O(1)
            <br />
            Delete End : O(n)
            <br />
            Search : O(n)
          </div>
        </div>
        <br />
      </div>
    </>
  );
}

export default LinkedList;