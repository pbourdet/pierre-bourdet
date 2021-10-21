<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211020191831 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE refresh_tokens_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE app_user (id UUID NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, nickname VARCHAR(255) NOT NULL, reset_password_token VARCHAR(255) DEFAULT NULL, reset_password_expiration_date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, language VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_88BDF3E9E7927C74 ON app_user (email)');
        $this->addSql('COMMENT ON COLUMN app_user.id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE game (id UUID NOT NULL, user_id UUID DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, score INT NOT NULL, game_name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_232B318CA76ED395 ON game (user_id)');
        $this->addSql('COMMENT ON COLUMN game.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN game.user_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN game.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE refresh_tokens (id INT NOT NULL, refresh_token VARCHAR(128) NOT NULL, username VARCHAR(255) NOT NULL, valid TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9BACE7E1C74F2195 ON refresh_tokens (refresh_token)');
        $this->addSql('CREATE TABLE todo (id UUID NOT NULL, user_id UUID NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) DEFAULT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, is_done BOOLEAN NOT NULL, reminder TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5A0EB6A0A76ED395 ON todo (user_id)');
        $this->addSql('COMMENT ON COLUMN todo.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN todo.user_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE messenger_messages (id BIGSERIAL NOT NULL, body TEXT NOT NULL, headers TEXT NOT NULL, queue_name VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name)');
        $this->addSql('CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at)');
        $this->addSql('CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at)');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318CA76ED395 FOREIGN KEY (user_id) REFERENCES app_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE todo ADD CONSTRAINT FK_5A0EB6A0A76ED395 FOREIGN KEY (user_id) REFERENCES app_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE game DROP CONSTRAINT FK_232B318CA76ED395');
        $this->addSql('ALTER TABLE todo DROP CONSTRAINT FK_5A0EB6A0A76ED395');
        $this->addSql('DROP SEQUENCE refresh_tokens_id_seq CASCADE');
        $this->addSql('DROP TABLE app_user');
        $this->addSql('DROP TABLE game');
        $this->addSql('DROP TABLE refresh_tokens');
        $this->addSql('DROP TABLE todo');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
