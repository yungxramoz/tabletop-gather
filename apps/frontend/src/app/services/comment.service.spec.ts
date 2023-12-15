import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_BASE_URL } from '../app.config';
import { CommentItemDto } from '../models/comment/comment-item.dto';
import { CreateComment } from '../models/comment/create-comment.dto';
import { UpdateCommentDto } from '../models/comment/update-comment.dto';
import { ResponseHandler } from '../utils/response.handler';
import { CommentService } from './comment.service';

describe(CommentService.name, () => {
  let commentService: CommentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CommentService,
        { provide: API_BASE_URL, useValue: 'http://api.example.com' },
        ResponseHandler,
      ],
    });
    commentService = TestBed.inject(CommentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve comments by plan ID', () => {
    const planId = '123';
    const expectedComments: CommentItemDto[] = [
      {
        id: '1',
        comment: 'Comment 1',
        user: '2',
        plan: '24',
        dateCreated: new Date(),
      },
      {
        id: '2',
        comment: 'Comment 2',
        user: '2',
        plan: '24',
        dateCreated: new Date(),
      },
    ];

    commentService.getCommentsByPlanId(planId).subscribe((comments) => {
      expect(comments).toEqual(expectedComments);
    });

    const req = httpMock.expectOne(`http://api.example.com/comments/${planId}`);
    expect(req.request.method).toBe('GET');
    req.flush({ content: expectedComments });
  });

  it('should create a new comment', () => {
    const createComment: CreateComment = {
      comment: 'Comment 1',
      plan: '24',
    };
    const expectedCommentId = '123';

    commentService.createComment(createComment).subscribe((commentId) => {
      expect(commentId).toBe(expectedCommentId);
    });

    const req = httpMock.expectOne('http://api.example.com/comments');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(createComment);
    req.flush(expectedCommentId, { status: 201, statusText: 'Created' });
  });

  it('should update a comment', () => {
    const updateComment: UpdateCommentDto = {
      comment: 'Updated comment',
    } as UpdateCommentDto;
    const expectedCommentId = '123';

    commentService.updateComment(updateComment).subscribe((commentId) => {
      expect(commentId).toBe(expectedCommentId);
    });

    const req = httpMock.expectOne(
      `http://api.example.com/comments/${updateComment.id}`
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updateComment);
    req.flush(expectedCommentId, { status: 200, statusText: 'OK' });
  });

  it('should delete a comment', () => {
    const commentId = '123';

    commentService.deleteComment(commentId).subscribe(() => {
      // Expecting no response body
    });

    const req = httpMock.expectOne(
      `http://api.example.com/comments/${commentId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 204, statusText: 'No Content' });
  });
});
