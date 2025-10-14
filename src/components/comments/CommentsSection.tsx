import { useState } from 'react';
import initialComments from '@/data/comments.json';

interface Comment {
    id: number;
    author: string;
    text: string;
    date: string;
}

const COMMENTS_PER_PAGE = 10;

const CommentsSection = () => {
    const [allComments, setAllComments] = useState<Comment[]>(initialComments);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    const totalPages = Math.ceil(allComments.length / COMMENTS_PER_PAGE);
    const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
    const endIndex = startIndex + COMMENTS_PER_PAGE;

    const currentComments = allComments.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!author.trim() || !text.trim()) {
            setShowModal(true);
            return;
        }

        const newComment: Comment = {
            id: Date.now(),
            author: author.trim(),
            text: text.trim(),
            date: new Date().toISOString(),
        };

        setAllComments(prevComments => [newComment, ...prevComments]);

        setCurrentPage(1);

        setAuthor('');
        setText('');
    };

    return (
        <div className="w-full max-w-[500px] md:max-w-[700px] lg:max-w-[960px] text-text p-4 rounded-md mb-6">
            <h2 className="text-2xl font-bold border-b-2 border-accent/20 pb-2 mb-4">
                Comments ({allComments.length})
            </h2>

            {showModal && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50
                   transition-opacity duration-300 ease-out"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-bg/85 backdrop-blur-sm rounded-xl p-8 max-w-sm w-[90%]
                       shadow-2xl border border-accent/20
                       transform transition-all duration-300 ease-out
                       scale-100 opacity-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h4 className="text-xl font-extrabold text-accent-alt mb-3 text-center tracking-wide">
                            Incomplete form
                        </h4>
                        <p className="text-text-secondary mb-6 text-center leading-relaxed">
                            Please fill in both your name and comment before submitting.
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full bg-accent-alt hover:bg-accent-alt/70 text-white font-semibold
                           px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out
                           shadow-md shadow-accent/40"
                        >
                            ОК
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="mb-6 bg-bg5 p-4 rounded-lg space-y-3">
                <h3 className="text-lg font-semibold text-text-secondary">Leave a comment</h3>
                <div>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Your name"
                        className="w-full bg-bg3/40 border border-bg-span/33 rounded-md p-2 text-text focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>
                <div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Your comment..."
                rows={4}
                className="w-full bg-bg3/40 border border-bg-span/33 rounded-md p-2 text-text focus:outline-none focus:ring-2 focus:ring-accent"
            />
                </div>
                <button
                    type="submit"
                    className="bg-accent-alt hover:bg-accent-alt/80 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                >
                    Submit
                </button>
            </form>



            <div className="space-y-4">
                {currentComments.length > 0 ? (
                    currentComments.map((comment) => (
                        <div key={comment.id} className="bg-bg5 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                                <p className="font-bold text-accent-alt">{comment.author}</p>
                                <p className="text-xs text-text-secondary">
                                    {new Date(comment.date).toLocaleString()}
                                </p>
                            </div>
                            <p className="text-text-secondary whitespace-pre-line">{comment.text}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-text-secondary text-center">No comments yet.</p>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-bg5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded-md ${
                                currentPage === page
                                    ? 'bg-accent-alt text-white font-bold'
                                    : 'bg-bg5 hover:bg-bg3'
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-bg5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>

    );
};

export default CommentsSection;