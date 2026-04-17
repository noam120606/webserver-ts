-- Table des Utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_admin BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB;

-- Table des Articles
CREATE TABLE IF NOT EXISTS posts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_post_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table des Commentaires
CREATE TABLE IF NOT EXISTS comments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comment_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table des Likes (Optimisée sans ID inutile)
CREATE TABLE IF NOT EXISTS likes (
    post_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, user_id),
    CONSTRAINT fk_like_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_like_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table des Followers
CREATE TABLE IF NOT EXISTS followers (
    follower_id BIGINT UNSIGNED NOT NULL,
    following_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, following_id),
    CONSTRAINT fk_follower FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_following FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 1. Accélérer l'affichage du flux (derniers articles postés)
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

-- 2. Accélérer la récupération des articles d'un utilisateur spécifique
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);

-- 3. Accélérer le chargement des commentaires sous un article
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);

-- 4. Accélérer la vérification des abonnés
-- (Déjà couvert en partie par la PRIMARY KEY composite, mais utile pour l'autre sens)
CREATE INDEX IF NOT EXISTS idx_followers_following_id ON followers(following_id);