CREATE TABLE `design_projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`shopType` varchar(64) NOT NULL,
	`brandProfile` varchar(64) NOT NULL,
	`status` enum('draft','in_progress','completed','exported') DEFAULT 'draft',
	`designConfig` text,
	`templateData` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `design_projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `design_versions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`versionNumber` int NOT NULL,
	`designConfig` text NOT NULL,
	`templateData` text NOT NULL,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `design_versions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mauve_templates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`version` varchar(32) NOT NULL,
	`schema` text NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mauve_templates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `design_projects` ADD CONSTRAINT `design_projects_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `design_versions` ADD CONSTRAINT `design_versions_projectId_design_projects_id_fk` FOREIGN KEY (`projectId`) REFERENCES `design_projects`(`id`) ON DELETE no action ON UPDATE no action;