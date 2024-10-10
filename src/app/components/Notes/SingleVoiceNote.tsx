"use client";
import React, { useEffect, useState } from "react";
import { singleNote } from "@/actions/notes/singleNote";
import { addComment } from "@/actions/notes/addComment";
import { toggleLike } from "@/actions/notes/toggleLike"; 
import { toggleFollowers } from "@/actions/notes/toggleFollowers"; // Add this import
import { useSession } from "next-auth/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const SingleVoiceNote = ({ noteId }) => {
  const { data: session } = useSession();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); // State to track following status

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const fetchedNote = await singleNote(noteId);
        setNote(fetchedNote);
        setComments(fetchedNote.comments);
        setLikeCount(fetchedNote.likes.length || 0); // Ensure like count defaults to 0
        setHasLiked(fetchedNote.likes.some(like => like.userId === session?.user?.id));
        setIsFollowing(fetchedNote.isFollowing); // Set following status from fetched note
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId, session?.user?.id]);

  const handleToggleLike = async () => {
    try {
      if (!session) {
        setError("Please login to like this note");
        return;
      }

      // Optimistically update like count and status
      setHasLiked((prev) => !prev);
      setLikeCount((prev) => hasLiked ? prev - 1 : prev + 1);

      await toggleLike(noteId); // Call the toggleLike function
    } catch (err) {
      console.error("Error toggling like", err);
      setError(err.message);
      // Rollback the optimistic update if there was an error
      setHasLiked((prev) => !prev);
      setLikeCount((prev) => hasLiked ? prev + 1 : prev - 1);
    }
  };

  const handleToggleFollow = async () => {
    try {
      if (!session) {
        setError("Please login to follow this user");
        return;
      }

      // Optimistically update following status
      setIsFollowing((prev) => !prev);
      const updatedFollowersCount = isFollowing ? note.user.followers.length - 1 : note.user.followers.length + 1;
      
      // Optimistically update note's follower count
      setNote((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          followers: isFollowing ? prev.user.followers.slice(0, -1) : [...prev.user.followers, session.user.id],
          following: prev.user.following // Assuming you don't need to update following count here
        }
      }));

      await toggleFollowers(note.user.id); // Call the toggleFollowers function
    } catch (err) {
      console.error("Error toggling follow status", err);
      setError(err.message);
      // Rollback the optimistic update if there was an error
      setIsFollowing((prev) => !prev);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = session.user.id;
      const addedComment = await addComment(noteId, newComment, userId);
      setComments([...comments, addedComment]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!note) return <div>Note not found</div>;

  return (
    <div className="voice-note-container">
      <h2 className="text-2xl font-bold">{note.title}</h2>
      <p>{note.description}</p>
      <audio controls src={note.fileUrl}>
        Your browser does not support the audio element.
      </audio>
      <p>Language: {note.language}</p>
      <p>Premium Content: {note.isPremium ? "Yes" : "No"}</p>
      <p>Category: {note.category}</p>
      
      {/* Like section with icon */}
      <div className="flex items-center gap-2 my-2">
        <button 
          onClick={handleToggleLike}
          className={`flex items-center gap-1 ${hasLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'} transition-colors`}
        >
          {hasLiked ? (
            <AiFillHeart size={24} />
          ) : (
            <AiOutlineHeart size={24} />
          )}
          <span>{likeCount}</span>
        </button>
      </div>

      {/* Follow section */}
      <div className="flex items-center gap-2 my-2">
        <button 
          onClick={handleToggleFollow}
          className={`p-2 rounded ${isFollowing ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
        >
          {isFollowing ? "Unfollow" : "Follow"} {note.user.username}
        </button>
        <p>{note.user.followers.length} Followers</p>
        <p>{note.user.following.length} Following</p>
      </div>

      <p>Comments: {comments.length}</p>
      <p>Created At: {new Date(note.createdAt).toLocaleDateString()}</p>

      <div className="comments-section mt-5">
        <h3 className="text-lg font-semibold">Comments</h3>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="border-b py-2">
                <p>
                  <strong>{comment.user.username}:</strong> {comment.text}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}

        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            required
            className="border p-2 w-full"
          />
          <button
            type="submit"
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleVoiceNote;
