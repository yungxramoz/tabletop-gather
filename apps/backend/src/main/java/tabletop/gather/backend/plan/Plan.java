package tabletop.gather.backend.plan;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import tabletop.gather.backend.comment.Comment;
import tabletop.gather.backend.game.Game;
import tabletop.gather.backend.gathering.Gathering;
import tabletop.gather.backend.user.User;

import java.time.OffsetDateTime;
import java.util.Set;
import java.util.UUID;


@Entity
@Table(name = "Plans")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Plan {

  @Id
  @Column(nullable = false, updatable = false)
  @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
  @GeneratedValue(generator = "uuid")
  private UUID id;


  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private Boolean isPrivate;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String description;

  @Column()
  private int playerLimit;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<Gathering> gatherings;

  @OneToMany(mappedBy = "plan")
  private Set<Comment> comments;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "game_id")
  private Game game;

  @CreatedDate
  @Column(nullable = false, updatable = false)
  private OffsetDateTime dateCreated;

  @LastModifiedDate
  @Column(nullable = false)
  private OffsetDateTime lastUpdated;

}
