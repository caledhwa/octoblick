'use strict';

const events = {
  CommitCommentEvent:'commit comment',
  CreateEvent: 'create',
  DeleteEvent: 'delete',
  DeploymentEvent: 'deployment',
  DeploymentStatusEvent: 'deployment status',
  DownloadEvent: 'download',
  FollowEvent: 'follow',
  ForkEvent: 'fork',
  ForkApplyEvent: 'fork apply',
  GistEvent: 'gist',
  GollumEvent: 'gollum',
  IssueCommentEvent: 'issue comment',
  IssuesEvent: 'issues',
  MemberEvent: 'member',
  MembershipEvent: 'membership',
  PageBuildEvent: 'page build',
  PublicEvent: 'public',
  PullRequestEvent: 'pull request',
  PullRequestReviewCommentEvent: 'pull request review comment',
  PushEvent: 'push',
  ReleaseEvent: 'release',
  RepositoryEvent: 'repository',
  StatusEvent: 'status',
  TeamAddEvent: 'team add',
  WatchEvent: 'watch'
};

class GitHub {
   mapEvent(event) {
     return events[event];
   }
}

module.exports = new GitHub();
